import crypto from "crypto";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import {
  generateEsewaSignature,
  decodeEsewaResponse,
  verifyEsewaResponseSignature,
} from "../utils/esewaSignature.js";

export const initiateEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existing = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      paymentStatus: { $in: ["pending", "completed"] },
    });
    if (existing && existing.paymentStatus === "completed") {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    const transactionId = `ITMS-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      amountPaid: course.fee,
      transactionId,
      paymentStatus: "pending",
    });

    const signature = generateEsewaSignature(
      course.fee,
      transactionId,
      process.env.ESEWA_MERCHANT_CODE,
      process.env.ESEWA_SECRET_KEY,
    );

    res.json({
      enrollmentId: enrollment._id,
      paymentUrl: process.env.ESEWA_PAYMENT_URL,
      formData: {
        amount: course.fee,
        tax_amount: 0,
        total_amount: course.fee,
        transaction_uuid: transactionId,
        product_code: process.env.ESEWA_MERCHANT_CODE,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        failure_url: `${process.env.CLIENT_URL}/payment/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      },
    });
  } catch (error) {
    console.error("INITIATE ENROLLMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyEnrollment = async (req, res) => {
  try {
    const { data } = req.query;
    if (!data) return res.status(400).json({ message: "Missing payment data" });

    const decoded = decodeEsewaResponse(data);
    const { transaction_uuid, status } = decoded;

    const enrollment = await Enrollment.findOne({
      transactionId: transaction_uuid,
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment record not found" });
    }

    const isValid = verifyEsewaResponseSignature(
      decoded,
      process.env.ESEWA_SECRET_KEY,
    );

    if (!isValid) {
      enrollment.paymentStatus = "failed";
      await enrollment.save();
      return res
        .status(400)
        .json({ message: "Signature mismatch — possible tampering" });
    }

    if (status === "COMPLETE") {
      enrollment.paymentStatus = "completed";
      enrollment.esewaRefId = decoded.transaction_code;
      await Course.findByIdAndUpdate(enrollment.course, {
        $inc: { enrollmentCount: 1 },
      });
    } else {
      enrollment.paymentStatus = "failed";
    }

    await enrollment.save();
    res.json({ status: enrollment.paymentStatus, enrollment });
  } catch (error) {
    console.error("VERIFY ENROLLMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id,
      paymentStatus: "completed",
    }).populate("course", "title slug thumbnail duration");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      student: req.user.id,
    })
      .populate("course", "title slug duration instructor")
      .populate("student", "name email");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsForCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized for this course" });
    }

    const enrollments = await Enrollment.find({
      course: req.params.courseId,
      paymentStatus: "completed",
    }).populate("student", "name email");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findById(req.params.id).populate(
      "course",
    );
    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    if (
      enrollment.course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    enrollment.progress = Math.max(0, Math.min(100, progress));
    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ paymentStatus: "completed" })
      .populate("student", "name email")
      .populate("course", "title fee")
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

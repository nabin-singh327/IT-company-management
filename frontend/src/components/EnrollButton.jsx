import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initiateEnrollment } from "../api/enrollmentApi";

function EnrollButton({ course }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { paymentUrl, formData } = await initiateEnrollment(course._id);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;

      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Enrollment initiation failed", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="bg-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
    >
      {loading ? "Redirecting to eSewa..." : "Enroll now"}
    </button>
  );
}

export default EnrollButton;
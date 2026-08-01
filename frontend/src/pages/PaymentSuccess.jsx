import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEnrollment } from "../api/enrollmentApi";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      const data = searchParams.get("data");
      if (!data) {
        setStatus("failed");
        return;
      }
      try {
        const result = await verifyEnrollment(data);
        setStatus(result.status === "completed" ? "success" : "failed");
      } catch (err) {
        console.error(err);
        setStatus("failed");
      }
    };
    verify();
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      {status === "verifying" && (
        <p className="font-mono text-ink/50 text-sm">verifying payment...</p>
      )}
      {status === "success" && (
        <>
          <p className="font-mono text-teal text-sm mb-2">// payment verified</p>
          <h1 className="font-display text-2xl font-semibold text-ink mb-3">
            You're enrolled 🎉
          </h1>
          <p className="text-ink/60 mb-6">
            Your payment was successful. You can now access this course from your dashboard.
          </p>
          <Link to="/dashboard" className="text-navy font-medium">
            Go to dashboard →
          </Link>
        </>
      )}
      {status === "failed" && (
        <>
          <h1 className="font-display text-2xl font-semibold text-ink mb-3">
            Payment verification failed
          </h1>
          <p className="text-ink/60 mb-6">
            Something went wrong verifying your payment. Please contact support if money was deducted.
          </p>
          <Link to="/courses" className="text-navy font-medium">
            Back to courses
          </Link>
        </>
      )}
    </div>
  );
}

export default PaymentSuccess;
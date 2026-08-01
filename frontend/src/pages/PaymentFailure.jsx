import { Link } from "react-router-dom";

function PaymentFailure() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink mb-3">Payment cancelled</h1>
      <p className="text-ink/60 mb-6">Your payment was not completed. No amount was charged.</p>
      <Link to="/courses" className="text-navy font-medium">
        Back to courses
      </Link>
    </div>
  );
}

export default PaymentFailure;
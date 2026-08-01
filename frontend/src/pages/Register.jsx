import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../redux/authSlice";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <span className="font-mono text-xs text-teal">03 · register</span>
      <h1 className="font-display text-2xl font-semibold text-ink mt-2 mb-6">
        Create your account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="phone"
          required
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-navy text-white font-semibold py-2.5 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-ink/50 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-navy font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default Register;
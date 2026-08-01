import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <span className="font-mono text-xs text-teal">// welcome back</span>
      <h1 className="font-display text-2xl font-semibold text-ink mt-2 mb-6">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="password"
          type="password"
          required
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
          {status === "loading" ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-sm text-ink/50 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-navy font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiError } from "../utils/getApiError";

const Login = () => {
  const [form, setForm] = useState({ email: "user@skillbiz.com", password: "user123" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : user.role === "mentor" ? "/mentor-dashboard" : "/dashboard");
    } catch (err) {
      setError(getApiError(err, "Login failed"));
    }
  };

  return (
    <form onSubmit={submit} className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-ink">Login</h2>
      <p className="mt-1 text-sm text-slate-500">Use your learner, mentor, or admin account.</p>
      {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <label className="mt-5 block text-sm font-semibold">Email</label>
      <input
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <label className="mt-4 block text-sm font-semibold">Password</label>
      <input
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="focus-ring mt-6 w-full rounded-md bg-leaf px-4 py-2 font-semibold text-white">Login</button>
      <p className="mt-4 text-sm text-slate-600">
        New here? <Link className="font-semibold text-leaf" to="/register">Create account</Link>
      </p>
    </form>
  );
};

export default Login;

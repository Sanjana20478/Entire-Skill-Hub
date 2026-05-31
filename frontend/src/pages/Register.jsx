import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiError } from "../utils/getApiError";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user", expertise: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = { ...form, expertise: form.expertise.split(",").map((item) => item.trim()).filter(Boolean) };
      const user = await register(payload);
      navigate(user.role === "mentor" ? "/mentor-dashboard" : "/profile");
    } catch (err) {
      setError(getApiError(err, "Registration failed"));
    }
  };

  return (
    <form onSubmit={submit} className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-ink">Register</h2>
      {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <label className="mt-5 block text-sm font-semibold">Name</label>
      <input className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label className="mt-4 block text-sm font-semibold">Email</label>
      <input className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <label className="mt-4 block text-sm font-semibold">Password</label>
      <input className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <label className="mt-4 block text-sm font-semibold">Account type</label>
      <select className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">Learner</option>
        <option value="mentor">Mentor</option>
      </select>
      {form.role === "mentor" && (
        <>
          <label className="mt-4 block text-sm font-semibold">Expertise</label>
          <input className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Food business, marketing" value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
        </>
      )}
      <button className="focus-ring mt-6 w-full rounded-md bg-leaf px-4 py-2 font-semibold text-white">Create account</button>
      <p className="mt-4 text-sm text-slate-600">
        Already registered? <Link className="font-semibold text-leaf" to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;

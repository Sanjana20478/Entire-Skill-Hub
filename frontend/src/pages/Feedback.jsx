import { useState } from "react";
import api from "../api/axios";

const Feedback = () => {
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    await api.post("/feedback", form);
    setForm({ rating: 5, comment: "" });
    setMessage("Feedback submitted. Thank you.");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-ink">Feedback and Reports</h1>
      <p className="mt-1 text-slate-600">Share a satisfaction score, issue report, or improvement suggestion.</p>
      {message && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>}
      <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <label className="block text-sm font-semibold">Satisfaction score</label>
        <select className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
        <label className="mt-4 block text-sm font-semibold">Comment or report</label>
        <textarea className="focus-ring mt-2 min-h-32 w-full rounded-md border border-slate-300 px-3 py-2" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
        <button className="focus-ring mt-4 rounded-md bg-leaf px-4 py-2 font-semibold text-white">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;

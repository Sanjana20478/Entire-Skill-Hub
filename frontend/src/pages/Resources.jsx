import { ExternalLink, FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", type: "Article", url: "", category: "" });
  const { user } = useAuth();

  const load = async () => {
    const { data } = await api.get("/resources");
    setResources(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await api.post("/resources", form);
    setForm({ title: "", description: "", type: "Article", url: "", category: "" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Learning Resources</h1>
      {(user.role === "mentor" || user.role === "admin") && (
        <form onSubmit={submit} className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-2">
          <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="focus-ring rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
          <textarea className="focus-ring rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-4 py-2 font-semibold text-white">
            <FilePlus2 className="h-4 w-4" /> Upload Training Resource
          </button>
        </form>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <article key={resource._id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-coral">{resource.type} · {resource.category}</p>
            <h2 className="mt-2 font-bold">{resource.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
            <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-leaf" href={resource.url} target="_blank" rel="noreferrer">
              Open <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Resources;

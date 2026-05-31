import {
  BookOpen,
  CalendarCheck,
  Lightbulb,
  MessageSquareText,
  Route,
  ShieldCheck,
  TrendingUp,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

const emptyIdea = {
  title: "",
  description: "",
  category: "",
  startupCost: "",
  difficulty: "Beginner",
  earningPotential: "",
  tags: ""
};

const emptyRoadmap = {
  title: "",
  businessIdea: "",
  overview: "",
  estimatedDuration: "8 weeks"
};

const defaultSteps = [
  "Idea validation",
  "Required tools",
  "Required skills",
  "Cost estimation",
  "Legal registration",
  "Marketing basics",
  "Growth tips"
];

const AdminPanel = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [resources, setResources] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [ideaForm, setIdeaForm] = useState(emptyIdea);
  const [roadmapForm, setRoadmapForm] = useState(emptyRoadmap);

  const load = async () => {
    const [statsRes, usersRes, mentorsRes, ideasRes, roadmapsRes, resourcesRes, feedbackRes, sessionsRes] =
      await Promise.all([
        api.get("/admin/stats"),
        api.get("/users"),
        api.get("/mentors"),
        api.get("/ideas"),
        api.get("/roadmaps"),
        api.get("/resources"),
        api.get("/feedback"),
        api.get("/sessions")
      ]);

    setStats(statsRes.data);
    setUsers(usersRes.data);
    setMentors(mentorsRes.data);
    setIdeas(ideasRes.data);
    setRoadmaps(roadmapsRes.data);
    setResources(resourcesRes.data);
    setFeedback(feedbackRes.data);
    setSessions(sessionsRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addIdea = async (event) => {
    event.preventDefault();
    await api.post("/ideas", {
      ...ideaForm,
      tags: ideaForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    });
    setIdeaForm(emptyIdea);
    load();
  };

  const addRoadmap = async (event) => {
    event.preventDefault();
    await api.post("/roadmaps", {
      ...roadmapForm,
      steps: defaultSteps.map((type, index) => ({
        type,
        order: index + 1,
        title: type,
        description: `${type} step for this business.`,
        tasks: ["Research requirement", "Prepare checklist", "Complete first action"]
      }))
    });
    setRoadmapForm(emptyRoadmap);
    load();
  };

  const approveMentor = async (id, isApproved) => {
    await api.patch(`/mentors/${id}/approve`, { isApproved });
    load();
  };

  const approveResource = async (id, isApproved) => {
    await api.put(`/resources/${id}`, { isApproved });
    load();
  };

  const markFeedback = async (id) => {
    await api.patch(`/feedback/${id}/status`, { status: "reviewed" });
    load();
  };

  const updateSession = async (id, status) => {
    await api.patch(`/sessions/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Admin Panel</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard icon={Users} label="Users" value={stats.users || 0} />
        <StatCard icon={ShieldCheck} label="Approved Mentors" value={stats.mentors || 0} tone="coral" />
        <StatCard icon={Lightbulb} label="Ideas" value={stats.ideas || 0} tone="amber" />
        <StatCard icon={BookOpen} label="Pending Resources" value={stats.pendingResources || 0} />
        <StatCard icon={Route} label="Roadmap Completion" value={`${stats.roadmapCompletionRate || 0}%`} />
        <StatCard icon={CalendarCheck} label="Mentor Interaction" value={`${stats.mentorInteractionRate || 0}%`} tone="coral" />
        <StatCard icon={MessageSquareText} label="Satisfaction" value={stats.userSatisfactionScore || 0} tone="amber" />
        <StatCard icon={TrendingUp} label="Sessions" value={stats.sessions || 0} />
      </div>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <FormSection title="Add Business Idea" onSubmit={addIdea}>
          {["title", "category", "startupCost", "earningPotential", "tags"].map((field) => (
            <input key={field} className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder={field} value={ideaForm[field]} onChange={(e) => setIdeaForm({ ...ideaForm, [field]: e.target.value })} required={field !== "tags"} />
          ))}
          <textarea className="focus-ring rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="description" value={ideaForm.description} onChange={(e) => setIdeaForm({ ...ideaForm, description: e.target.value })} required />
          <button className="focus-ring rounded-md bg-leaf px-4 py-2 font-semibold text-white">Add Idea</button>
        </FormSection>

        <FormSection title="Add Roadmap" onSubmit={addRoadmap}>
          <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Roadmap title" value={roadmapForm.title} onChange={(e) => setRoadmapForm({ ...roadmapForm, title: e.target.value })} required />
          <select className="focus-ring rounded-md border border-slate-300 px-3 py-2" value={roadmapForm.businessIdea} onChange={(e) => setRoadmapForm({ ...roadmapForm, businessIdea: e.target.value })} required>
            <option value="">Select business idea</option>
            {ideas.map((idea) => <option key={idea._id} value={idea._id}>{idea.title}</option>)}
          </select>
          <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Duration" value={roadmapForm.estimatedDuration} onChange={(e) => setRoadmapForm({ ...roadmapForm, estimatedDuration: e.target.value })} />
          <textarea className="focus-ring rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="overview" value={roadmapForm.overview} onChange={(e) => setRoadmapForm({ ...roadmapForm, overview: e.target.value })} required />
          <button className="focus-ring rounded-md bg-leaf px-4 py-2 font-semibold text-white">Add Roadmap</button>
        </FormSection>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <AdminBox title="Manage Users" rows={users.map((u) => `${u.name} · ${u.email} · ${u.role}`)} />
        <AdminBox title="Approve Mentors">
          {mentors.map((mentor) => (
            <ActionRow key={mentor._id} label={`${mentor.user?.name} · ${mentor.isApproved ? "Approved" : "Pending"}`}>
              <button onClick={() => approveMentor(mentor._id, !mentor.isApproved)} className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">
                {mentor.isApproved ? "Unapprove" : "Approve"}
              </button>
            </ActionRow>
          ))}
        </AdminBox>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <AdminBox title="Approve Training Content">
          {resources.map((resource) => (
            <ActionRow key={resource._id} label={`${resource.title} · ${resource.isApproved ? "Approved" : "Pending"}`}>
              <button onClick={() => approveResource(resource._id, !resource.isApproved)} className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">
                {resource.isApproved ? "Unapprove" : "Approve"}
              </button>
            </ActionRow>
          ))}
        </AdminBox>
        <AdminBox title="Handle Reports and Feedback">
          {feedback.map((item) => (
            <ActionRow key={item._id} label={`${item.user?.name} · ${item.rating}/5 · ${item.status} · ${item.comment}`}>
              <button onClick={() => markFeedback(item._id)} className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">Review</button>
            </ActionRow>
          ))}
        </AdminBox>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <AdminBox title="Mentor Sessions">
          {sessions.map((session) => (
            <ActionRow key={session._id} label={`${session.topic} · ${session.mentor?.user?.name || "Mentor"} · ${session.status}`}>
              {["accepted", "completed", "cancelled"].map((status) => (
                <button key={status} onClick={() => updateSession(session._id, status)} className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">{status}</button>
              ))}
            </ActionRow>
          ))}
        </AdminBox>
        <AdminBox title="Business Ideas and Roadmaps">
          {ideas.map((idea) => (
            <ActionRow key={idea._id} label={`${idea.title} · ${idea.category}`}>
              <button onClick={async () => { await api.delete(`/ideas/${idea._id}`); load(); }} className="focus-ring rounded-md bg-coral px-3 py-1 text-sm font-semibold text-white">Delete</button>
            </ActionRow>
          ))}
          {roadmaps.map((roadmap) => (
            <ActionRow key={roadmap._id} label={`${roadmap.title} · ${roadmap.estimatedDuration}`}>
              <button onClick={async () => { await api.delete(`/roadmaps/${roadmap._id}`); load(); }} className="focus-ring rounded-md bg-coral px-3 py-1 text-sm font-semibold text-white">Delete</button>
            </ActionRow>
          ))}
        </AdminBox>
      </section>
    </div>
  );
};

const FormSection = ({ title, onSubmit, children }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-5">
    <h2 className="text-lg font-bold">{title}</h2>
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-2">{children}</form>
  </section>
);

const AdminBox = ({ title, rows = [], children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-5">
    <h2 className="text-lg font-bold">{title}</h2>
    <div className="mt-4 space-y-3">
      {rows.map((item) => <div key={item} className="rounded-md bg-slate-50 p-3 text-sm">{item}</div>)}
      {children}
    </div>
  </div>
);

const ActionRow = ({ label, children }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 p-3 text-sm">
    <span>{label}</span>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

export default AdminPanel;

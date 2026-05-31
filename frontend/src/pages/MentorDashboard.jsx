import { BookOpen, HelpCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

const MentorDashboard = () => {
  const [data, setData] = useState({ mentor: null, resources: [] });
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/mentors/me").then(({ data }) => setData(data));
    api.get("/sessions").then(({ data }) => setSessions(data));
  }, []);

  const mentor = data.mentor;
  const questions = mentor?.questions || [];

  const answer = async (questionId, text) => {
    if (!text) return;
    await api.patch(`/mentors/questions/${questionId}/answer`, { answer: text });
  };

  const updateSession = async (id, status) => {
    await api.patch(`/sessions/${id}/status`, { status });
    const { data } = await api.get("/sessions");
    setSessions(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Mentor Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard icon={Users} label="Mentees" value={mentor?.mentees?.length || 0} />
        <StatCard icon={BookOpen} label="Resources Uploaded" value={data.resources.length} tone="amber" />
        <StatCard icon={HelpCircle} label="Q&A Requests" value={questions.length} tone="coral" />
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Mentor Sessions</h2>
        <div className="mt-4 space-y-3">
          {sessions.map((session) => (
            <div key={session._id} className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 p-3">
              <div>
                <p className="font-semibold">{session.topic}</p>
                <p className="text-sm text-slate-500">
                  {session.mentee?.name} · {new Date(session.preferredDate).toLocaleString()} · {session.mode} · {session.status}
                </p>
              </div>
              <div className="flex gap-2">
                {["accepted", "completed", "cancelled"].map((status) => (
                  <button key={status} onClick={() => updateSession(session._id, status)} className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {sessions.length === 0 && <p className="text-sm text-slate-500">No session requests yet.</p>}
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Mentee Engagement</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {mentor?.mentees?.map((mentee) => (
            <div key={mentee._id} className="rounded-md bg-slate-50 p-3">
              <p className="font-semibold">{mentee.name}</p>
              <p className="text-sm text-slate-500">{mentee.email}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Q&A Support</h2>
        <div className="mt-4 space-y-4">
          {questions.map((item) => (
            <Question key={item._id} item={item} onAnswer={answer} />
          ))}
        </div>
      </section>
    </div>
  );
};

const Question = ({ item, onAnswer }) => {
  const [answer, setAnswer] = useState(item.answer || "");
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold">{item.question}</p>
      <p className="mt-1 text-sm text-slate-500">Asked by {item.askedBy?.name || "Learner"} · {item.status}</p>
      <textarea className="focus-ring mt-3 w-full rounded-md border border-slate-300 px-3 py-2" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={() => onAnswer(item._id, answer)} className="focus-ring mt-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white">
        Save Answer
      </button>
    </div>
  );
};

export default MentorDashboard;

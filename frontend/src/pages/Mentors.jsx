import { useEffect, useState } from "react";
import api from "../api/axios";
import MentorCard from "../components/MentorCard";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [session, setSession] = useState({
    topic: "",
    preferredDate: "",
    mode: "Online",
    notes: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/mentors").then(({ data }) => setMentors(data));
  }, []);

  const connect = async (id) => {
    await api.post(`/mentors/${id}/connect`);
    setMessage("Mentor connection saved.");
  };

  const requestSession = async (event) => {
    event.preventDefault();
    await api.post(`/sessions/mentors/${selected._id}`, session);
    setSession({ topic: "", preferredDate: "", mode: "Online", notes: "" });
    setSelected(null);
    setMessage("Mentor session requested.");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Mentorship Support</h1>
      {message && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor._id}
            mentor={mentor}
            onConnect={connect}
            onSession={() => setSelected(mentor)}
          />
        ))}
      </div>
      {selected && (
        <form onSubmit={requestSession} className="mt-6 max-w-2xl rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">Request Session with {selected.user?.name}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Topic" value={session.topic} onChange={(e) => setSession({ ...session, topic: e.target.value })} required />
            <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" type="datetime-local" value={session.preferredDate} onChange={(e) => setSession({ ...session, preferredDate: e.target.value })} required />
            <select className="focus-ring rounded-md border border-slate-300 px-3 py-2" value={session.mode} onChange={(e) => setSession({ ...session, mode: e.target.value })}>
              <option>Online</option>
              <option>Phone</option>
              <option>In-person</option>
            </select>
            <input className="focus-ring rounded-md border border-slate-300 px-3 py-2" placeholder="Notes" value={session.notes} onChange={(e) => setSession({ ...session, notes: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <button className="focus-ring rounded-md bg-leaf px-4 py-2 font-semibold text-white">Send Request</button>
            <button type="button" onClick={() => setSelected(null)} className="focus-ring rounded-md border border-slate-300 px-4 py-2 font-semibold">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Mentors;

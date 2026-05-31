import { CalendarPlus, MessageCircle, UserPlus } from "lucide-react";

const MentorCard = ({ mentor, onConnect, onSession }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="text-lg font-bold text-ink">{mentor.user?.name}</h3>
    <p className="mt-1 text-sm text-slate-500">{mentor.user?.location || "Remote"} · {mentor.experienceYears} years</p>
    <p className="mt-3 text-sm leading-6 text-slate-600">{mentor.user?.bio || "Available for micro-business guidance."}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {mentor.expertise?.map((item) => (
        <span key={item} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-leaf">
          {item}
        </span>
      ))}
    </div>
    <div className="mt-5 flex gap-2">
      <button
        type="button"
        onClick={() => onConnect?.(mentor._id)}
        className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-3 py-2 text-sm font-semibold text-white"
      >
        <UserPlus className="h-4 w-4" /> Connect
      </button>
      <button className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">
        <MessageCircle className="h-4 w-4" /> Q&A
      </button>
      <button
        type="button"
        onClick={onSession}
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold"
      >
        <CalendarPlus className="h-4 w-4" /> Session
      </button>
    </div>
  </article>
);

export default MentorCard;

import { Bookmark, Route } from "lucide-react";
import { Link } from "react-router-dom";

const IdeaCard = ({ idea, onBookmark }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-coral">{idea.category}</p>
        <h3 className="mt-1 text-lg font-bold text-ink">{idea.title}</h3>
      </div>
      {idea.matchScore ? (
        <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-leaf">
          {idea.matchScore} match
        </span>
      ) : null}
    </div>
    <p className="mt-3 text-sm leading-6 text-slate-600">{idea.description}</p>
    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
      <span className="rounded-md bg-slate-50 p-2">Cost: {idea.startupCost}</span>
      <span className="rounded-md bg-slate-50 p-2">Level: {idea.difficulty}</span>
    </div>
    {idea.matchReasons?.length ? (
      <div className="mt-4 flex flex-wrap gap-2">
        {idea.matchReasons.map((reason) => (
          <span key={reason} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
            {reason}
          </span>
        ))}
      </div>
    ) : null}
    <div className="mt-5 flex flex-wrap gap-2">
      <Link
        to={`/roadmaps?idea=${idea._id}`}
        className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-3 py-2 text-sm font-semibold text-white"
      >
        <Route className="h-4 w-4" /> Roadmap
      </Link>
      <button
        type="button"
        onClick={() => onBookmark?.(idea._id)}
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-ink"
      >
        <Bookmark className="h-4 w-4" /> Save
      </button>
    </div>
  </article>
);

export default IdeaCard;

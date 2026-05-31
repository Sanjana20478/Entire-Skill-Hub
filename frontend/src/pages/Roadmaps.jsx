import { CheckCircle2, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const Roadmaps = () => {
  const [params] = useSearchParams();
  const [roadmaps, setRoadmaps] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const idea = params.get("idea");
    api.get(`/roadmaps${idea ? `?idea=${idea}` : ""}`).then(({ data }) => {
      setRoadmaps(data);
      if (data[0]) loadDetails(data[0]._id);
    });
  }, [params]);

  const loadDetails = async (id) => {
    const { data } = await api.get(`/roadmaps/${id}`);
    setSelected(data);
  };

  const start = async () => {
    await api.post("/progress", {
      businessIdea: selected.businessIdea._id,
      roadmap: selected._id
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Business Roadmaps</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          {roadmaps.map((roadmap) => (
            <button
              key={roadmap._id}
              onClick={() => loadDetails(roadmap._id)}
              className={`focus-ring w-full rounded-lg border p-4 text-left ${
                selected?._id === roadmap._id ? "border-leaf bg-mist" : "border-slate-200 bg-white"
              }`}
            >
              <p className="font-bold">{roadmap.title}</p>
              <p className="mt-1 text-sm text-slate-500">{roadmap.estimatedDuration}</p>
            </button>
          ))}
        </aside>
        {selected && (
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{selected.title}</h2>
                <p className="mt-2 text-slate-600">{selected.overview}</p>
              </div>
              <button onClick={start} className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-4 py-2 font-semibold text-white">
                <PlayCircle className="h-4 w-4" /> Start
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {selected.steps?.map((step) => (
                <div key={step._id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-leaf" />
                    <h3 className="font-bold">{step.order}. {step.type}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {step.tasks.map((task) => <li key={task}>{task}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;

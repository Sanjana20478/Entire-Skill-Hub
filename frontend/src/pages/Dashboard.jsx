import { BookOpen, BriefcaseBusiness, CheckCircle2, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [progress, setProgress] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/progress").catch(() => ({ data: [] })),
      api.get("/users/recommendations").catch(() => ({ data: [] })),
      api.get("/resources").catch(() => ({ data: [] }))
    ]).then(([progressRes, ideasRes, resourcesRes]) => {
      setProgress(progressRes.data);
      setIdeas(ideasRes.data);
      setResources(resourcesRes.data);
    });
  }, []);

  const averageProgress = progress.length
    ? Math.round(progress.reduce((sum, item) => sum + item.percentComplete, 0) / progress.length)
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Progress Tracking Dashboard</h1>
      <p className="mt-1 text-slate-600">Your ideas, learning, and launch progress in one place.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Lightbulb} label="Recommended Ideas" value={ideas.length} />
        <StatCard icon={CheckCircle2} label="Average Progress" value={`${averageProgress}%`} tone="coral" />
        <StatCard icon={BookOpen} label="Resources" value={resources.length} tone="amber" />
        <StatCard icon={BriefcaseBusiness} label="Active Roadmaps" value={progress.length} />
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">Roadmap Progress</h2>
        <div className="mt-4 space-y-4">
          {progress.length === 0 && <p className="text-sm text-slate-500">Start a roadmap to track progress.</p>}
          {progress.map((item) => (
            <div key={item._id}>
              <div className="flex justify-between text-sm font-semibold">
                <span>{item.businessIdea?.title}</span>
                <span>{item.percentComplete}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-leaf" style={{ width: `${item.percentComplete}%` }} />
              </div>
              <p className="mt-1 text-sm text-slate-500">Current: {item.currentStep?.title || "Completed"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

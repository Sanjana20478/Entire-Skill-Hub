import { ArrowRight, BookOpen, ChartNoAxesColumnIncreasing, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => (
  <main className="min-h-screen bg-slate-50">
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
      <div>
        <p className="font-semibold uppercase tracking-wide text-coral">Skill-to-Business Entrepreneurship Platform</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-6xl">
          Turn practical skills into real micro-businesses.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Get business ideas matched to your skills, follow structured roadmaps, use learning resources, and connect with mentors.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="focus-ring inline-flex items-center gap-2 rounded-md bg-leaf px-5 py-3 font-semibold text-white">
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/login" className="focus-ring rounded-md border border-slate-300 px-5 py-3 font-semibold text-ink">
            Login
          </Link>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["Cooking", "Home Bakery Business"],
          ["Tailoring", "Boutique"],
          ["Digital Skills", "Freelancing"],
          ["Handicrafts", "Handmade Store"]
        ].map(([skill, idea]) => (
          <div key={skill} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-coral">{skill}</p>
            <p className="mt-2 text-xl font-bold text-ink">{idea}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3">
        <Feature icon={ChartNoAxesColumnIncreasing} title="Roadmaps" text="Validation, tools, skills, cost, legal setup, marketing, and growth steps." />
        <Feature icon={BookOpen} title="Resources" text="Curated training resources and beginner-friendly checklists." />
        <Feature icon={Users} title="Mentors" text="Expert support through profiles, engagement tracking, and Q&A." />
      </div>
    </section>
  </main>
);

const Feature = ({ icon: Icon, title, text }) => (
  <div className="rounded-lg border border-slate-200 p-5">
    <Icon className="h-6 w-6 text-leaf" />
    <h2 className="mt-3 text-lg font-bold">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
  </div>
);

export default Home;

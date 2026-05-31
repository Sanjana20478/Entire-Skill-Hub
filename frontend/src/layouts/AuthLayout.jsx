import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="min-h-screen bg-mist">
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
      <Link to="/" className="font-bold text-leaf">Skill-to-Business</Link>
      <div className="grid flex-1 items-center gap-8 py-10 md:grid-cols-[1fr_420px]">
        <section>
          <p className="font-semibold uppercase tracking-wide text-coral">Entrepreneurship Platform</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-ink md:text-5xl">
            Convert everyday skills into sustainable micro-businesses.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Discover business ideas, follow clear roadmaps, learn from resources, and connect with mentors.
          </p>
        </section>
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;

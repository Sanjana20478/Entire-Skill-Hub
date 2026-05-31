import {
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  MessageSquareText,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  ShieldCheck,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home, roles: ["user", "mentor", "admin"] },
  { to: "/profile", label: "Profile", icon: Users, roles: ["user", "mentor", "admin"] },
  { to: "/recommendations", label: "Ideas", icon: Lightbulb, roles: ["user", "admin"] },
  { to: "/roadmaps", label: "Roadmaps", icon: ChartNoAxesColumnIncreasing, roles: ["user", "admin"] },
  { to: "/resources", label: "Resources", icon: BookOpen, roles: ["user", "mentor", "admin"] },
  { to: "/mentors", label: "Mentors", icon: BriefcaseBusiness, roles: ["user", "admin"] },
  { to: "/feedback", label: "Feedback", icon: MessageSquareText, roles: ["user", "mentor", "admin"] },
  { to: "/mentor-dashboard", label: "Mentor", icon: Users, roles: ["mentor"] },
  { to: "/admin", label: "Admin", icon: ShieldCheck, roles: ["admin"] }
];

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const visibleLinks = links.filter((link) => link.roles.includes(user?.role));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-leaf text-white">SB</span>
            <span>Skill-to-Business</span>
          </Link>
          <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm text-slate-500">{user?.name} · {user?.role}</span>
            <button onClick={logout} className="focus-ring rounded-md border border-slate-300 p-2" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className={`${open ? "block" : "hidden"} border-b border-slate-200 bg-white p-4 md:block md:min-h-[calc(100vh-65px)] md:border-b-0 md:border-r`}>
          <nav className="space-y-1">
            {visibleLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
                    isActive ? "bg-mist text-leaf" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-h-[calc(100vh-65px)] p-4 md:p-6">
          <Outlet />
          <footer className="mt-10 border-t border-slate-200 pt-4 text-sm text-slate-500">
            Skill-to-Business Entrepreneurship Platform · Learn, launch, grow.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

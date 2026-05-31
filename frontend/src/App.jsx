import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MentorDashboard from "./pages/MentorDashboard";
import Mentors from "./pages/Mentors";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Register from "./pages/Register";
import Resources from "./pages/Resources";
import Roadmaps from "./pages/Roadmaps";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/mentors" element={<Mentors />} />
        </Route>
        <Route element={<ProtectedRoute roles={["mentor"]} />}>
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        </Route>
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

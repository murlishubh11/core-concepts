import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Protected dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-portal" element={<StudentPortal />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
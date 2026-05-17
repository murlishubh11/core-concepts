import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import Dashboard from "./pages/Dashboard";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<HomePage />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/student-login"   element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/student-portal"  element={<StudentPortal />} />
        <Route path="*"                element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
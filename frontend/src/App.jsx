import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import Status from "./pages/Status";

function ProtectedRoute({ children }) {
  const { isAuthenticated, applicationLoading, application } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (applicationLoading) return <div className="page-loading">Checking your application…</div>;
  if (application) return <Navigate to="/status" replace />;
  return children;
}

function AppRoutes() {
  const { isAuthenticated, applicationLoading, application } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to={applicationLoading ? "/" : application ? "/status" : "/apply"} replace /> : <Register />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={applicationLoading ? "/" : application ? "/status" : "/apply"} replace /> : <Login />} />
      <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
      <Route path="/status" element={isAuthenticated ? <Status /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AuthProvider><BrowserRouter><AppRoutes /></BrowserRouter></AuthProvider>;
}

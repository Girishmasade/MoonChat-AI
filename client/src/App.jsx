import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Commondashboard/Dashboard";
import UserLogin from "./pages/Auth/UserLogin";
import SignUp from "./pages/Auth/SignUp";
import UserDashboard from "./pages/UserPages/UserDashboard";
import ProtectedRoutes from "./components/Protected & Public Route/ProtectedRoutes";
import PublicRoute from "./components/Protected & Public Route/PublicRoute";
import MainLayout from "./components/All components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <UserLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

          <Route element={<MainLayout />}>
            <Route path="/chat-dashboard" element={<ProtectedRoutes><UserDashboard /></ProtectedRoutes>} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserLogin from "./pages/Auth/UserLogin";
import SignUp from "./pages/Auth/SignUp";
import OAuthSuccess from "./pages/Auth/OAuthSuccess/OAuthSuccess";
import MainLayout from "./components/All components/MainLayout";
import ProtectedRoutes from "./components/Protected & Public Route/ProtectedRoutes";
import PublicRoute from "./components/Protected & Public Route/PublicRoute";
import AdminProtectedRoute from "./components/Protected & Public Route/AdminProtectedRoute"; 
import NotFound from "./pages/UserPages/NotFound";

const Dashboard     = lazy(() => import("./pages/Commondashboard/Dashboard"));   
const About         = lazy(() => import("./pages/Commondashboard/About"));
const Privacy       = lazy(() => import("./pages/Commondashboard/Privacy"));
const Terms         = lazy(() => import("./pages/Commondashboard/Terms"));
const ForgetPassword = lazy(() => import("./pages/Auth/ForgetPassword"));

const UserDashboard = lazy(() => import("./pages/UserPages/UserDashboard"));
const AiChatting    = lazy(() => import("./pages/AIchatting/AiChatting"));
const Chats         = lazy(() => import("./pages/UserPages/Chats"));
const Contacts      = lazy(() => import("./pages/UserPages/Contacts"));
const Settings      = lazy(() => import("./pages/UserPages/Settings"));

const AdminDashboard = lazy(() => import("./pages/AdminPages/AdminDashboard"));
const AdminSignup    = lazy(() => import("./pages/Auth/Admin/AdminSignup"));
const AdminSignin    = lazy(() => import("./pages/Auth/Admin/AdminSignin"));

import "./index.css";
import Loader from "./components/All components/Loader";

const PageLoader = () => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "'Space Grotesk', sans-serif",
    color: "#888",
    fontSize: "14px",
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            <Route
              path="/signin"
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
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* Protected user routes */}
            <Route element={<MainLayout />}>
              <Route
                path="/chat-dashboard"
                element={
                  <ProtectedRoutes>
                    <UserDashboard />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/novachat"
                element={
                  <ProtectedRoutes>
                    <AiChatting />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/chats"
                element={
                  <ProtectedRoutes>
                    <Chats />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/contacts"
                element={
                  <ProtectedRoutes>
                    <Contacts />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoutes>
                    <Settings />
                  </ProtectedRoutes>
                }
              />
            </Route>

            <Route
              path="/admin-dashboard"
              element={
                  <AdminDashboard />
              }
            />
            <Route
              path="/admin-signup"
              element={
                  <AdminSignup />
              }
            />
            <Route
              path="/admin-signin"
              element={<AdminSignin />} 
            />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
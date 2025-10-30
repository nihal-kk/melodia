import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Nav";
import "./App.css";
import Liked from "./components/Liked";
import Home from "./pages/Home";
import Sadsongs from "./components/playlist/Sad";
import Lovesongs from "./components/playlist/Love";
import Happysongs from "./components/playlist/Happy";
import Ponksongs from "./components/playlist/Ponk";
import Adrenalinesongs from "./components/playlist/Adrenaline";
import AudioPlayer from "./components/AudioPlayer";
import Mylist from "./components/Mylist";
import History from "./components/History";
import Library from "./components/Library";
import Settings from "./components/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Breakupsongs from "./components/playlist/Breakup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 min-h-screen bg-[#0D0D0D] text-white relative pb-24">
          {isAuthenticated && <Navbar onMenuClick={() => setSidebarOpen(true)} />}

          <div className="p-6 space-y-12">
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    role === "admin" ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  isAuthenticated ? (
                    role === "admin" ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Signup />
                  )
                }
              />

              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/liked" element={<ProtectedRoute><Liked /></ProtectedRoute>} />
              <Route path="/sadsongs" element={<ProtectedRoute><Sadsongs /></ProtectedRoute>} />
              <Route path="/breakupsongs" element={<ProtectedRoute><Breakupsongs /></ProtectedRoute>} />
              <Route path="/lovesongs" element={<ProtectedRoute><Lovesongs /></ProtectedRoute>} />
              <Route path="/happysongs" element={<ProtectedRoute><Happysongs /></ProtectedRoute>} />
              <Route path="/ponksongs" element={<ProtectedRoute><Ponksongs /></ProtectedRoute>} />
              <Route path="/adrenalinesongs" element={<ProtectedRoute><Adrenalinesongs /></ProtectedRoute>} />
              <Route path="/myPlaylist" element={<ProtectedRoute><Mylist /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        {isAuthenticated && <AudioPlayer />}

        <ToastContainer position="top-center" autoClose={2500} theme="dark" />
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  User,
  Lock,
  Bell,
  Volume2,
  Globe,
  Trash2,
  LogOut,
  Palette,
} from "lucide-react";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";


export default function Settings() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [audioQuality, setAudioQuality] = useState("High");
  const [accent, setAccent] = useState("#FF9E2E");
  const dispatch = useDispatch();


  // 🔥 Fetch user from backend (simulate logged-in user)
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/users?loggedIn=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setUser(data[0]);
      })
      .catch(console.error);
  }, []);

  // 🟡 Logout handler
  const handleLogout = async () => {
    if (!user) return;
    await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loggedIn: false }),
    });
    alert("Logged out successfully!");
    setUser(null);
    dispatch(logout());
    
    window.location.href='/login'
  };

  // 🔴 Delete account handler
  const handleDeleteAccount = async () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete your account?")) {
      await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
        method: "DELETE",
      });
      alert("Account deleted successfully!");
      setUser(null);
    dispatch(logout());

    window.location.href='/login'


    }
  };

  return (
    <div className="md:ml-64 mt-10 w-full max-w-[1280px] mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold text-[#FF9E2E] mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <User className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Profile</h3>
        </div>

        {user ? (
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="font-medium text-white">Username:</span>{" "}
              {user.username}
            </p>
            <p>
              <span className="font-medium text-white">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium text-white">Plan:</span> {user.plan}
            </p>
            <button className="mt-3 px-4 py-2 bg-[#FF9E2E] text-black font-semibold rounded-lg hover:bg-[#ffb85d] transition">
              Edit Profile
            </button>
          </div>
        ) : (
          <p className="text-gray-400">No user logged in.</p>
        )}
      </div>

      {/* Theme Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Appearance</h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-300 text-sm">Dark Mode</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center w-12 h-6 rounded-full transition-all ${
              darkMode ? "bg-[#FF9E2E]" : "bg-gray-600"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-3" : "-translate-x-3"
              }`}
            />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-300 text-sm">Accent Color</p>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-10 h-6 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Audio Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Volume2 className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Audio Preferences</h3>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-300 text-sm">Streaming Quality</p>
          <select
            value={audioQuality}
            onChange={(e) => setAudioQuality(e.target.value)}
            className="bg-[#0D0D0D] text-white rounded px-3 py-1 border border-gray-600 text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Bell className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-300 text-sm">Enable Notifications</p>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="accent-[#FF9E2E] w-5 h-5"
          />
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Globe className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Language</h3>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#0D0D0D] text-white rounded px-3 py-2 border border-gray-600 text-sm"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Malayalam</option>
          <option>Tamil</option>
        </select>
      </div>

      {/* Privacy Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="text-[#FF9E2E]" />
          <h3 className="text-lg font-semibold">Privacy & Security</h3>
        </div>
        <p className="text-gray-400 text-sm mb-3">
          Control your account visibility and data sharing preferences.
        </p>
        <button className="px-4 py-2 bg-[#FF9E2E] text-black font-semibold rounded-lg hover:bg-[#ffb85d] transition">
          Manage Privacy
        </button>
      </div>

      {/* Account Management */}
      {user && (
        <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg">
          <h3 className="flex items-center gap-3 text-lg font-semibold mb-3">
            <LogOut className="text-[#FF9E2E]" /> Account Management
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF9E2E] text-black rounded-lg hover:bg-[#ffb85d] transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

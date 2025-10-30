import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Library,
  ListMusic,
  Heart,
  History,
  Settings,
  Music2,
  X,
  LayoutDashboard,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/browse", icon: Compass, label: "Browse" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/myPlaylist", icon: ListMusic, label: "My Playlist" },
  { to: "/liked", icon: Heart, label: "Liked" },
  { to: "/history", icon: History, label: "History" },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const USERS_URL = "https://melodia-data-5.onrender.com/users";

  // ✅ Fetch user and set role
  const fetchUserRole = async () => {
    try {
      setLoading(true);

      const storedUser = localStorage.getItem("melodia_user");
      if (!storedUser) {
        console.warn("No user found in localStorage");
        setRole(null);
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser?.email) {
        console.warn("User has no email property");
        setRole(null);
        setLoading(false);
        return;
      }

      const res = await fetch(USERS_URL);
      const users = await res.json();

      const loggedUser = users.find((u) => u.email === parsedUser.email);

      if (loggedUser) {
        setRole(loggedUser.role);
      } else {
        console.warn("User not found in DB for email:", parsedUser.email);
        setRole(null);
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();

    const onRoleChanged = () => fetchUserRole();
    window.addEventListener("roleChanged", onRoleChanged);
    return () => window.removeEventListener("roleChanged", onRoleChanged);
  }, []);

  const isAdmin = role === "admin";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0D0D0D] border-r border-[#1a1a1a] text-[#EAEAEA] flex flex-col transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <Music2 className="h-7 w-7 text-[#FF9E2E]" />
            <span className="text-xl font-bold text-[#FF9E2E]">Melodia</span>
          </div>
          <button onClick={onClose} className="md:hidden">
            <X className="h-6 w-6 text-gray-400 hover:text-[#FF9E2E]" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                  isActive ? "text-[#FF9E2E] bg-[#1a1a1a]" : "text-gray-400"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Checking user role...
            </div>
          )}

          {/* ✅ Admin Dashboard Link */}
          {isAdmin && !loading && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                  isActive ? "text-[#FF9E2E] bg-[#1a1a1a]" : "text-gray-400"
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
          )}
        </nav>

        {/* Settings */}
        <div className="px-3 py-4 border-t border-[#1a1a1a]">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                isActive ? "text-[#FF9E2E] bg-[#1a1a1a]" : "text-gray-400"
              )
            }
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

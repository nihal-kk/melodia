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
import { useSelector } from "react-redux";

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

  const { accentColor, backgroundColor, textColor } = useSelector(
    (state) => state.theme
  );

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("melodia_user");

      if (!storedUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      const res = await fetch(USERS_URL);
      const users = await res.json();
      const loggedUser = users.find((u) => u.email === parsedUser.email);
      setRole(loggedUser ? loggedUser.role : null);
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
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r border-[#1a1a1a] transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-6 border-b border-[#1a1a1a]"
          style={{ color: accentColor }}
        >
          <div className="flex items-center gap-2">
            <Music2 className="h-7 w-7" style={{ color: accentColor }} />
            <span className="text-xl font-bold">Melodia</span>
          </div>
          <button onClick={onClose} className="md:hidden">
            <X className="h-6 w-6 text-gray-400 hover:opacity-70" />
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
                  isActive ? "bg-[#1a1a1a]" : "text-gray-400"
                )
              }
              style={({ isActive }) => ({
                color: isActive ? accentColor : textColor,
              })}
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

          {isAdmin && !loading && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                  isActive ? "bg-[#1a1a1a]" : "text-gray-400"
                )
              }
              style={({ isActive }) => ({
                color: isActive ? accentColor : textColor,
              })}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
          )}

          {/* ⭐ Mobile-only Settings (under Liked) */}
          <div className="md:hidden">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                  isActive ? "bg-[#1a1a1a]" : "text-gray-400"
                )
              }
              style={({ isActive }) => ({
                color: isActive ? accentColor : textColor,
              })}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* Desktop-only bottom settings */}
        <div className="px-3 py-4 border-t mt-10 border-[#1a1a1a] hidden md:block">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#1a1a1a]",
                isActive ? "bg-[#1a1a1a]" : "text-gray-400"
              )
            }
            style={({ isActive }) => ({
              color: isActive ? accentColor : textColor,
            })}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

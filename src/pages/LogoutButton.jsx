import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // 🎨 Get the current accent color from Redux theme
  const { accentColor } = useSelector((state) => state.theme);

  const handleLogout = async () => {
    if (!user) return;

    try {
      await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggedIn: false }),
      });

      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-1 rounded transition"
      style={{
        backgroundColor: accentColor, // 🌈 uses global theme color
        color: "#000",
      }}
    >
      <LogOutIcon size={18} />
    </button>
  );
}

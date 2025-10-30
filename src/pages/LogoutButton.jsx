import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // get user from redux

  const handleLogout = async () => {
    if (!user) return;

    try {
      await fetch(`https://melodia-data-5.onrender.com/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggedIn: false }),
      });

      dispatch(logout());
      navigate("/login"); // smoother redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-[#FF9E2E] text-black px-3 py-1 rounded hover:bg-[#ffa948] transition"
    >
      <LogOutIcon size={18} />
      {/* <span>Logout</span> */}
    </button>
  );
}

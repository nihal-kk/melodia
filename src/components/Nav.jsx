import { Search, Bell, User, Menu, LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";
import { useState } from "react";
import LogoutButton from "../pages/LogoutButton";

export const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="h-18 border-b border-[#1a1a1a] bg-[#0D0D0D]/95 backdrop-blur sticky top-0 z-50 md:ml-64">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu */}
        <button onClick={onMenuClick} className="md:hidden mr-3">
          <Menu className="h-6 w-6 text-[#FF9E2E]" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={value}
              onChange={handleChange}
              placeholder="Search songs, artists, playlists..."
              className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] text-[#EAEAEA] placeholder-gray-500 border border-[#2a2a2a] rounded-xl focus:border-[#FF9E2E] focus:ring-1 focus:ring-[#FF9E2E] outline-none"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-6">
          <button className="relative p-2 rounded-full hover:bg-[#1a1a1a]">
            <Bell className="h-5 w-5 text-[#EAEAEA]" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#FF9E2E] rounded-full" />
          </button>

          <button className="p-2 rounded-full hover:bg-[#1a1a1a]">
            <User className="h-5 w-5 text-[#EAEAEA]" />
          </button>
          <LogoutButton/>
        </div>
      </div>
    </header>
  );
};

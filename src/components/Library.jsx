import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Library() {
  const navigate = useNavigate();
  const { accentColor } = useSelector((state) => state.theme); // 🎨 Redux accent color

  const playlists = [
    { id: 1, title: "Sad Songs", img: "/photos/play/sad.jpg", path: "/sadsongs" },
    { id: 2, title: "Love Songs", img: "/photos/play/love.jpg", path: "/lovesongs" },
    { id: 3, title: "Happy Songs", img: "/photos/play/rap.jpg", path: "/happysongs" },
    { id: 4, title: "Ponk Songs", img: "/photos/play/dia.jpeg", path: "/ponksongs" },
    { id: 5, title: "Breakup Songs", img: "/photos/play/breckup.jpg", path: "/breakupsongs" },
    { id: 6, title: "Adrenaline Songs", img: "/photos/play/Adrenaline.jpg", path: "/Adrenalinesongs" },
  ];

  return (
    <div className="md:ml-64 mt-10 w-full max-w-[1280px] mx-auto px-4">
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: accentColor }}
      >
        Playlists
      </h2>

      {/* Responsive Flex Grid */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {playlists.map((song) => (
          <div
            key={song.id}
            onClick={() => navigate(song.path)}
            className="relative w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] cursor-pointer bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 transition-transform duration-500"
          >
            <img
              src={song.img}
              alt={song.title}
              className="w-full h-40 md:h-48 object-cover rounded-xl"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span
                className="text-lg font-semibold"
                style={{ color: accentColor }}
              >
                Open
              </span>
            </div>

            {/* Title */}
            <div className="text-center text-white text-sm font-medium mt-2 mb-1 truncate">
              {song.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

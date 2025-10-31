import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import LikeButton from "../components/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";

export default function History() {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { accentColor } = useSelector((state) => state.theme); // 🎨 connected to themeSlice (Redux global color)

  // ✅ Fetch recently played songs
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/history?_sort=playedAt&_order=desc")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error loading history:", err));
  }, []);

  // ✅ Handle play/pause
  const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: history }));
  };

  return (
    <div className="mt-10 w-full max-w-[1280px] mx-auto md:ml-68 p-4">
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: accentColor }}
      >
        Recently Played
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No recently played songs yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {history.map((song, index) => (
            <div
              key={song.id}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden relative group w-[160px] md:w-[200px] transition-all hover:scale-105 hover:shadow-lg"
            >
              {/* 🖼 Song Image */}
              <div className="relative">
                <img
                  src={song.img}
                  alt={song.title}
                  className="w-full h-[160px] object-cover"
                />

                {/* ▶️ Hover Play / Pause */}
                <button
                  onClick={() => handlePlay(song, index)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="h-10 w-10" style={{ color: accentColor }} />
                  ) : (
                    <Play className="h-10 w-10" style={{ color: accentColor }} />
                  )}
                </button>
              </div>

              {/* 🎶 Song Info */}
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-xs truncate">{song.artist}</p>
              </div>

              {/* ❤️ Like Button */}
              <div className="absolute top-2 right-2">
                <LikeButton song={song} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

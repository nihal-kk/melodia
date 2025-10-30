import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import LikeButton from "../components/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";

export default function History() {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  // ✅ Fetch recently played songs
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/history?_sort=playedAt&_order=desc")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error loading history:", err));
  }, []);

  // ✅ Handle play
  const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: history }));
  };

  return (
    <div className="mt-10 w-full max-w-[1280px] mx-auto overflow-hidden md:ml-68">
      <h2 className="text-xl font-bold text-[#FF9E2E] mb-4">Recently Played</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No recently played songs yet.</p>
      ) : (
        history.map((song, index) => (
          <div key={song.id} className="mb-2 flex items-center">
            <div className="flex relative rounded-lg overflow-hidden w-full group">
              <img
                src={song.img}
                alt={song.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Hover Play Button */}
              <button
                onClick={() => handlePlay(song, index)}
                className="absolute inset-0 flex items-center p-6 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity rounded-lg"
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-8 w-8 text-[#FF9E2E]" />
                ) : (
                  <Play className="h-8 w-8 text-[#FF9E2E]" />
                )}
              </button>

              <div className="p-2">
                <h3 className="text-white font-semibold text-sm mt-1">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-xs">{song.artist}</p>
              </div>
            </div>
            <div className="ml-2 flex items-center">
              <LikeButton song={song} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

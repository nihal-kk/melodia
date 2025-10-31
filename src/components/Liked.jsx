import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";
import { Play, Pause } from "lucide-react";

function Liked() {
  const [likedSongs, setLikedSongs] = useState([]);
  const dispatch = useDispatch();

  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { accentColor } = useSelector((state) => state.theme); // 🎨 Get global accent color

  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/liked")
      .then((res) => res.json())
      .then((data) => setLikedSongs(data));
  }, []);

  const removeLike = async (id) => {
    await fetch(`https://melodia-data-5.onrender.com/liked/${id}`, {
      method: "DELETE",
    });
    setLikedSongs(likedSongs.filter((song) => song.id !== id));
  };

  const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: likedSongs }));
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: accentColor }}
      >
        Liked Songs
      </h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">No liked songs yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {likedSongs.map((song) => {
            const isActive = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                className={`relative group rounded-2xl p-4 transition-all duration-300 ${
                  isActive
                    ? "bg-opacity-20"
                    : "bg-[#1A1A1A] hover:bg-[#252525]"
                }`}
                style={{
                  backgroundColor: isActive ? accentColor : undefined,
                }}
              >
                <div className="relative">
                  <img
                    src={song.img}
                    alt={song.title}
                    className={`rounded-xl w-50 h-50 object-cover ${
                      isActive ? "border-2" : ""
                    }`}
                    style={{
                      borderColor: isActive ? accentColor : "transparent",
                    }}
                  />

                  {/* Play / Pause Overlay */}
                  <button
                    onClick={() => handlePlay(song)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity rounded-xl"
                  >
                    {isActive && isPlaying ? (
                      <Pause className="h-10 w-10" style={{ color: accentColor }} />
                    ) : (
                      <Play className="h-10 w-10" style={{ color: accentColor }} />
                    )}
                  </button>
                </div>

                <div className="mt-3">
                  <h3
                    className="text-sm font-semibold truncate"
                    style={{
                      color: isActive ? accentColor : "#fff",
                    }}
                  >
                    {song.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                </div>

                <button
                  onClick={() => removeLike(song.id)}
                  className="absolute top-2 right-2 hover:text-red-500 transition"
                  style={{ color: accentColor }}
                >
                  💔
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Liked;

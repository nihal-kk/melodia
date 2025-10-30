import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";
import { Play, Pause } from "lucide-react";

function Liked() {
  const [likedSongs, setLikedSongs] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

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
    dispatch(playSong({ song, index, playlist: songs }));
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#FF9E2E]">Liked Songs</h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">No liked songs yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              className="relative group bg-[#1A1A1A] rounded-2xl p-4  h-70    hover:bg-[#252525] transition-all"
            >
              <div className="relative">
                <img
                  src={song.img}
                  alt={song.title}
                  className="rounded-xl w-50 h-50 object-cover"
                />

                {/* Play Button Overlay */}
                <button
                  onClick={() => handlePlay(song)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity rounded-xl"
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="h-10 w-10 text-[#FF9E2E]" />
                  ) : (
                    <Play className="h-10 w-10 text-[#FF9E2E]" />
                  )}
                </button>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold truncate">{song.title}</h3>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
              </div>

              <button
                onClick={() => removeLike(song.id)}
                className="absolute top-2 right-2 text-[#FF9E2E] hover:text-red-500"
              >
                💔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Liked;

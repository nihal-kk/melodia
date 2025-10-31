import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";
import { Play, Pause } from "lucide-react";

function Mylist() {
  const [likedSongs, setLikedSongs] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { accentColor } = useSelector((state) => state.theme); // 🎨 Redux color

  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/mylist")
      .then((res) => res.json())
      .then((data) => setLikedSongs(data));
  }, []);

  const removeLike = async (id) => {
    await fetch(`https://melodia-data-5.onrender.com/mylist/${id}`, {
      method: "DELETE",
    });
    setLikedSongs(likedSongs.filter((song) => song.id !== id));
  };

  const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: likedSongs }));
  };

  return (
    <div className="md:ml-64 min-h-screen bg-[#0D0D0D] text-white p-8">
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: accentColor }}
      >
        My Playlist
      </h2>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">No songs in your playlist yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              className="relative group bg-[#1A1A1A] rounded-2xl p-4 hover:bg-[#252525] transition-all cursor-pointer w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%]"
            >
              <div className="relative">
                <img
                  src={song.img}
                  alt={song.title}
                  className="rounded-xl w-full h-44 object-cover"
                />

                {/* Play Button Overlay */}
                <button
                  onClick={() => handlePlay(song)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-80 transition-opacity rounded-xl"
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause
                      className="h-10 w-10"
                      style={{ color: accentColor }}
                    />
                  ) : (
                    <Play
                      className="h-10 w-10"
                      style={{ color: accentColor }}
                    />
                  )}
                </button>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold truncate">
                  {song.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
              </div>

              <button
                onClick={() => removeLike(song.id)}
                className="absolute top-2 right-2 text-sm font-bold transition"
                style={{
                  color: accentColor,
                }}
                onMouseOver={(e) => (e.target.style.color = "red")}
                onMouseOut={(e) => (e.target.style.color = accentColor)}
              >
                −
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mylist;

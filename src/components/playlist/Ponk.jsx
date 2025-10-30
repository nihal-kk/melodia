import React, { useEffect, useState } from "react";
import { Play, Pause, Heart } from "lucide-react";
import LikeButton from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../redux/playerSlice";
export default function Ponksongs() {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/allSongs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

   const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: songs }));
  };
  return (
    <div className="mt-10 w-full max-w-[1280px] mx-auto overflow-hidden md:ml-68">
      <h2 className="text-xl font-bold text-[#FF9E2E] mb-4">Ponk Songs</h2>

      {songs.map((song) => song.mood === "ponk" && (
        <div key={song.id} className="mb-2 flex items-center">
          <div className="flex relative rounded-lg overflow-hidden w-full group">
            <img
              src={song.img}
              alt={song.title}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* Hover Play Button */}
            <button
              onClick={() => handlePlay(song)}
              className="absolute inset-0 flex items-center p-6 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity rounded-lg"
            >
              {currentSong?.id === song.id && isPlaying ? (
                <Pause className="h-8 w-8 text-[#FF9E2E]" />
              ) : (
                <Play className="h-8 w-8 text-[#FF9E2E]" />
              )}
            </button>

            <div className="p-2">
              <h3 className="text-white font-semibold text-sm mt-1">{song.title}</h3>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
          </div>
          <div className="ml-2 flex items-center">
            <LikeButton song={song} />
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import LikeButton from "./LikeButton";
import PlusButton from "./Myplaylist";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";

export default function All() {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { query } = useSelector((state) => state.search);

  // ✅ Fetch all songs
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/allSongs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Handle Play + Add to history
  const handlePlay = async (song, index) => {
    // Play the song using Redux
    dispatch(playSong({ song, index, playlist: songs }));

    try {
      // Check if song already in history
      const res = await fetch(`https://melodia-data-5.onrender.com/history?songId=${song.id}`);
      const data = await res.json();

      // If not found, add to history
      if (data.length === 0) {
        await fetch("https://melodia-data-5.onrender.com/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            songId: song.id,
            title: song.title,
            artist: song.artist,
            img: song.img,
            audio: song.audio,
            playedAt: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Error saving history:", err);
    }
  };

  // ✅ Filter songs by search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-10 w-full max-w-[1280px] mx-auto overflow-hidden">
      <h2 className="text-xl font-bold text-[#FF9E2E] mb-4">All Songs</h2>

      {filteredSongs.map((song, index) => (
        <div key={song.id} className="mb-2 flex items-center">
          <div className="flex relative rounded-lg overflow-hidden w-full group">
            {/* Song Image */}
            <img
              src={song.img}
              alt={song.title}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* Hover Play Button */}
            <button
              onClick={() => handlePlay(song, index)}
              className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-70 pl-6 opacity-0 group-hover:opacity-70 transition-opacity rounded-lg"
            >
              {currentSong?.id === song.id && isPlaying ? (
                <Pause className="h-8 w-8 text-[#FF9E2E]" />
              ) : (
                <Play className="h-8 w-8 text-[#FF9E2E]" />
              )}
            </button>

            {/* Song Info */}
            <div className="p-2">
              <h3 className="text-white font-semibold text-sm mt-1">
                {song.title}
              </h3>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
          </div>

          {/* Like + Playlist Buttons */}
          <div className="ml-2 flex items-center">
            <PlusButton song={song} />
            <LikeButton song={song} />
          </div>
        </div>
      ))}
    </div>
  );
}

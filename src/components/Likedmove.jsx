import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Play, Pause } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function LikedSlider() {
  const [songs, setSongs] = useState([]);
     const dispatch = useDispatch();
     const { currentSong, isPlaying } = useSelector((state) => state.player);
  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/liked")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.log(err));
  }, []);

  // 🧠 Hide the section completely if no songs
  if (!songs || songs.length === 0) {
    return null; // 👈 Nothing rendered
  }
     const handlePlay = (song, index) => {
       dispatch(playSong({ song, index, playlist: songs }));
     };
  return (
    <div className="mt-10 w-full max-w-[1280px] mx-auto overflow-hidden">
      <h2 className="text-xl font-bold text-[#FF9E2E] mb-4">Liked Songs</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        navigation
        loop={true}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 4, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 1 },
          768: { slidesPerView: 3, slidesPerGroup: 1 },
          1024: { slidesPerView: 5, slidesPerGroup: 1 },
        }}
      >
        {songs.map((song) => (
          <SwiperSlide key={song.id}>
            <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden w-50 h-50 group">
              <img
                src={song.img}
                alt={song.title}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Hover Play Button */}
              <button
                onClick={() => handlePlay(song)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-80 transition-opacity rounded-lg"
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-8 w-8 text-[#FF9E2E]" />
                ) : (
                  <Play className="h-8 w-8 text-[#FF9E2E]" />
                )}
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent z-10">
                <h3 className="text-white font-semibold text-sm">{song.title}</h3>
                <p className="text-gray-300 text-xs">{song.artist}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import { Play, Pause } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../redux/playerSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function TrendSlider() {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    fetch("https://melodia-data-5.onrender.com/rec")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: songs }));
  };

  return (
    <div className=" w-full max-w-[1280px] mx-auto overflow-hidden">
      <h2 className="text-5xl sm:text-2xl font-bold text-[#FF9E2E] mb-10 sm:text-left">
        Trending Songs
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={15}
        slidesPerView={2}
        slidesPerGroup={1}
        navigation
        loop={true}
        speed={1500}
        autoplay={{
          delay: 3000,
          
       reverseDirection: true, 
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 3, slidesPerGroup: 1 },
          480: { slidesPerView: 2, slidesPerGroup: 1 },
          768: { slidesPerView: 3, slidesPerGroup: 1 },
          1024: { slidesPerView: 4, slidesPerGroup: 1 },
          1280: { slidesPerView: 5, slidesPerGroup: 1 },
        }}
      >
        {songs.map((song, index) => (
          <SwiperSlide key={song.id}>
            <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden w-full h-full sm:h-56 md:h-60 group shadow-md hover:shadow-[#FF9E2E]/30 transition-all">
              <img
                src={song.img}
                alt={song.title}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Hover Play Button */}
              <button
                onClick={() => handlePlay(song, index)}
                className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-10 w-10 sm:h-12 sm:w-12 text-[#FF9E2E]" />
                ) : (
                  <Play className="h-10 w-10 sm:h-12 sm:w-12 text-[#FF9E2E]" />
                )}
              </button>

              {/* Title & Artist */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                  {song.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

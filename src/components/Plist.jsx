import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 🎨 to access global color

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Playlist() {
  const navigate = useNavigate();

  // 🎨 Get accent color from Redux
  const { accentColor } = useSelector((state) => state.theme);

  const playlists = [
    { id: 1, title: "Sad Songs", img: "/photos/play/sad.jpg", path: "/sadsongs" },
    { id: 2, title: "Love Songs", img: "/photos/play/love.jpg", path: "/lovesongs" },
    { id: 3, title: "Happy Songs", img: "/photos/play/rap.jpg", path: "/happysongs" },
    { id: 4, title: "Ponk Songs", img: "/photos/play/dia.jpeg", path: "/ponksongs" },
    { id: 5, title: "Breakup Songs", img: "/photos/play/breckup.jpg", path: "/breakupsongs" },
    { id: 6, title: "Adrenaline Songs", img: "/photos/play/Adrenaline.jpg", path: "/Adrenalinesongs" },
  ];

  return (
    <div className="mt-10 w-[350px] sm:w-full max-w-[1280px] mx-auto overflow-hidden">
      <h2
        className="text-1xl sm:text-2xl font-bold mb-4 sm:text-left"
        style={{ color: accentColor }}
      >
        Playlists
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={2}
        slidesPerGroup={1}
        navigation
        loop={true}
        speed={1200}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 3, slidesPerGroup: 1 },
          480: { slidesPerView: 3, slidesPerGroup: 1 },
          768: { slidesPerView: 3, slidesPerGroup: 1 },
          1024: { slidesPerView: 4, slidesPerGroup: 1 },
          1280: { slidesPerView: 5, slidesPerGroup: 1 },
        }}
      >
        {playlists.map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <div
              className="relative bg-[#1a1a1a] rounded-xl overflow-hidden w-full h-full sm:h-56 md:h-60 group shadow-md transition-all"
              style={{
                boxShadow: `0 0 10px ${accentColor}40`, // soft glow
              }}
            >
              <img
                src={playlist.img}
                alt={playlist.title}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Hover Open Button */}
              <button
                onClick={() => navigate(playlist.path)}
                className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span
                  className="font-semibold text-lg"
                  style={{ color: accentColor }}
                >
                  Open
                </span>
              </button>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                  {playlist.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

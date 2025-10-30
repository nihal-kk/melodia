import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const navigate = useNavigate();

  const playlists = [
    { id: 1, title: "Sad Songs", img: "/photos/play/sad.jpg", path: "/sadsongs" },
    { id: 2, title: "Love Songs", img: "/photos/play/love.jpg", path: "/lovesongs" },
    { id: 3, title: "happy Songs", img: "/photos/play/rap.jpg", path: "/happysongs" },
    { id: 4, title: "ponk Songs", img: "/photos/play/dia.jpeg", path: "/ponksongs" },
    { id: 5, title: "breakup songs", img: "/photos/play/breckup.jpg", path: "/breakupsongs" },
    { id: 6, title: "Adrenaline songs", img: "/photos/play/Adrenaline.jpg", path: "/Adrenalinesongs" },
  ];

  return (
    <div className="md:ml-64 mt-10 w-full max-w-[1280px] mx-auto overflow-hidden">
      <h2 className="text-xl font-bold text-[#FF9E2E] mb-4">PlayLists</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        loop={true}
        scrollbar={{ draggable: true }}
      >
        {playlists.map((song) => (
          <SwiperSlide key={song.id}>
            <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden w-50 h-50 group">
              <img
                src={song.img}
                alt={song.title}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Hover Click Button */}
              <button
                onClick={() => navigate(song.path)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-80 transition-opacity rounded-lg"
              >
                <span className="text-[#FF9E2E] font-semibold">Open</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

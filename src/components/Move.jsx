import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const ImageSwiper = () => {
  const images = [
    "/photos/moving/moving-1.png",
    "/photos/moving/moving-2.png",
    "/photos/moving/moving-3.png",
    "/photos/moving/moving-4.png",
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }}
        className="w-full max-w-[1200px] h-[auto]" // container scales with screen
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

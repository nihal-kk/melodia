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
    <div className="flex justify-center items-center w-[350px] sm:w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { spaceBetween: 10 },
          768: { spaceBetween: 15 },
          1024: { spaceBetween: 20 },
        }}
        className="w-full max-w-[1200px] h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

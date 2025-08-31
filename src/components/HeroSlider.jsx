// src/components/HeroSlider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Import your banners
import Desktop_Banner_1 from "../assets/images/Desktop_Banner_1.webp";
import DIVA_BANNER_2 from "../assets/images/DIVA_BANNER_2.webp";

// --- Slides Data ---
const slidesData = [
  {
    id: 1,
    imageUrl: Desktop_Banner_1,
    link: "/products",
  },
  {
    id: 2,
    imageUrl: DIVA_BANNER_2,
    link: "/products",
  },
];

const HeroSlider = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        className="w-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={slide.link}>
              <img
                src={slide.imageUrl}
                alt={`Slide ${slide.id}`}
                className="w-full h-[40vh] sm:h-[60vh] lg:h-[80vh] object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 p-1 sm:p-2 bg-white/70 rounded-full cursor-pointer hover:bg-white transition">
        <FiChevronLeft className="text-gray-800 text-xl sm:text-2xl" />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 p-1 sm:p-2 bg-white/70 rounded-full cursor-pointer hover:bg-white transition">
        <FiChevronRight className="text-gray-800 text-xl sm:text-2xl" />
      </button>
    </div>
  );
};

export default HeroSlider;

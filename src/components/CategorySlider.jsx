
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/categoryApi";

const CategorySlider = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-1/3 bg-gray-200 rounded-md mx-auto mb-10 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center py-8 text-red-600">
        Failed to load categories.
      </p>
    );

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Integrated Navigation */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <div className="hidden sm:flex items-center gap-3">
            <button
              ref={prevRef}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <FiChevronLeft className="text-xl text-gray-700" />
            </button>
            <button
              ref={nextRef}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <FiChevronRight className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

       <Swiper
  modules={[Navigation]}
  spaceBetween={30}
  breakpoints={{
    320: { slidesPerView: 1, spaceBetween: 15 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
  }}
  onInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }}
  className="w-full relative"
>
  {/* Floating buttons */}
  <button
    ref={prevRef}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 sm:hidden"
  >
    <FiChevronLeft className="text-xl text-gray-700" />
  </button>
  <button
    ref={nextRef}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 sm:hidden"
  >
    <FiChevronRight className="text-xl text-gray-700" />
  </button>

  {data?.categories?.map((category) => (
    <SwiperSlide key={category.id}>
      <Link
        to={`/category/${category.slug}`}
        className="group block text-center"
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-80 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <h3 className="mt-4 text-xl capitalize font-semibold text-gray-800 group-hover:text-black transition-colors">
          {category.name}
        </h3>
      </Link>
    </SwiperSlide>
  ))}
</Swiper>

      </div>
    </div>
  );
};

export default CategorySlider;

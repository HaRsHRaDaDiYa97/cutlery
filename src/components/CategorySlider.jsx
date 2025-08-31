// src/components/CategorySlider.js
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <p className="text-center py-8">Loading categories...</p>;
  if (isError) return <p className="text-center py-8 text-red-600">Failed to load categories.</p>;

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop by Categories
        </h2>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".category-swiper-button-next",
            prevEl: ".category-swiper-button-prev",
          }}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="w-full"
        >
          {data?.categories?.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to={`/category/${category.slug}`} className="group block text-center">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={category.image} // dynamically from API
                    alt={category.name}
                    className="w-full h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-4">
                    <div className="mx-auto w-4/5 bg-white/80 backdrop-blur-sm p-3 text-gray-800 rounded-md shadow-sm">
                      <h4 className="font-semibold capitalize">{category.name}</h4>
                      <p className="text-sm">Starting from ₹ 249/-</p>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-800">
                  {category.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <button className="category-swiper-button-prev p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <FiChevronLeft className="text-xl text-gray-600" />
          </button>
          <button className="category-swiper-button-next p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <FiChevronRight className="text-xl text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;

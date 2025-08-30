// src/components/CategorySlider.js

import React, { useState, useEffect } from 'react';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


import pendant from '../assets/images/pendant.webp'
import keychain from '../assets/images/keychain.webp'
import { Link } from 'react-router-dom';


// --- Placeholder Data for Categories (Update the href) ---
const categoryData = [
  {
    id: 1,
    slug: "keychain",
    imgSrc: keychain,
    overlayTitle: 'Keychains',
    overlaySubtitle: 'Starting from ₹ 249/-',
    title: 'Keychain',
  },
  {
    id: 2,
    slug: "Pendant",
    imgSrc: pendant,
    overlayTitle: 'Pendants',
    overlaySubtitle: 'Starting from ₹ 249/-',
    title: 'Pendant',
  },
  // add more categories here
];



const CategorySlider = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop by Categories
        </h2>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.category-swiper-button-next',
            prevEl: '.category-swiper-button-prev',
          }}
          spaceBetween={30}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 15
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          className="w-full"
        >
          {categoryData.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to={`/category/${category.slug}`} className="group block text-center">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={category.imgSrc}
                    alt={category.title}
                    className="w-full h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-4">
                    <div className="mx-auto w-4/5 bg-white/80 backdrop-blur-sm p-3 text-gray-800 rounded-md shadow-sm">
                      <h4 className="font-semibold">{category.overlayTitle}</h4>
                      <p className="text-sm">{category.overlaySubtitle}</p>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {category.title}
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
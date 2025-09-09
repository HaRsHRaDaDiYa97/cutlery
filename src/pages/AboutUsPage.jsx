import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiStar, FiShield, FiUsers } from 'react-icons/fi';


import Desktop_Banner_1 from '../assets/images/Desktop_Banner_1.webp'
import { Helmet } from 'react-helmet-async';
import AboutSEO from '../seo_helmet/AboutSEO';

// A reusable component for the "Our Values" section
const ValueCard = ({ icon, title, children }) => (
  <div className="text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
      {icon}
    </div>
    <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-600">{children}</p>
  </div>
);

// A reusable component for the "By the Numbers" section
const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center text-center">
    <p className="text-5xl font-bold tracking-tight text-white">{value}</p>
    <p className="mt-2 text-base leading-7 text-gray-400">{label}</p>
  </div>
);

export default function AboutUsPage() {
  return (

<>



<AboutSEO />


    <div className="bg-white">
      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          {/* <img
            src= {Desktop_Banner_1}
            alt="Crafting jewelry"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black/60 -z-10" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                A Legacy of Brilliance
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                Discover the story behind DIVA JEWELLER, where timeless elegance and masterful craftsmanship have been our tradition for generations.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="lg:pr-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Founded in 1985 in the heart of Rajkot, DIVA JEWELLER began as a small family workshop with a singular vision: to create exquisite pieces of jewelry that would be cherished for a lifetime. Our founder, inspired by the rich heritage of Indian artistry, dedicated himself to sourcing the finest materials and perfecting the art of jewelry making.
              </p>
              <p className="mt-8 text-lg leading-8 text-gray-600">
                Today, we continue this legacy. Every piece in our collection is a testament to our commitment to quality, beauty, and the timeless bond that jewelry creates between generations.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src= {Desktop_Banner_1}
                alt="Detailed jewelry work"
                className="rounded-2xl shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What We Stand For</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our values are the cornerstone of our brand, guiding every decision we make.
            </p>
            <div className="mt-16 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard icon={<FiAward className="h-8 w-8" />} title="Master Craftsmanship">
                Our artisans blend traditional techniques with modern innovation to create jewelry of unparalleled quality.
              </ValueCard>
              <ValueCard icon={<FiStar className="h-8 w-8" />} title="Timeless Designs">
                We create pieces that transcend trends, destined to become cherished family heirlooms.
              </ValueCard>
              <ValueCard icon={<FiShield className="h-8 w-8" />} title="Ethical Sourcing">
                We are committed to responsibly sourcing our materials, ensuring beauty you can feel good about.
              </ValueCard>
              <ValueCard icon={<FiUsers className="h-8 w-8" />} title="Customer Trust">
                Building lasting relationships with our clients through honesty and exceptional service is our priority.
              </ValueCard>
            </div>
          </div>
        </div>

        {/* By the Numbers Section */}
        <div className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <StatItem value="40+" label="Years in Business" />
                    <StatItem value="5,000+" label="Pieces Created" />
                    <StatItem value="99%" label="Customer Satisfaction" />
                    <StatItem value="3" label="Generations of Artisans" />
                </div>
            </div>
        </div>

        {/* Call to Action Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Explore Our Collection
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
                Discover the perfect piece that tells your story.
            </p>
            <div className="mt-10">
                <Link
                    to="/products"
                    className="rounded-md bg-black px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        </div>
      </main>
    </div>

    </>
  );
}
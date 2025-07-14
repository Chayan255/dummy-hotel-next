"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="h-[60vh] w-full"
      >
        <SwiperSlide>
          <div className="bg-[url('/images/hero1.jpg')] bg-cover bg-center h-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
            Welcome to Hotel Delish
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/images/hero2.jpg')] bg-cover bg-center h-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
            Enjoy Our Authentic Dishes
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/images/hero3.jpg')] bg-cover bg-center h-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
            Fresh. Tasty. Delightful.
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Popular Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition">
            <img src="images/dish1.jpg" alt="Dish" className="rounded w-full h-40 object-cover" />
            <h3 className="mt-4 font-bold text-lg">Butter Chicken</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition">
            <img src="images/dish2.jpg" alt="Dish" className="rounded w-full h-40 object-cover" />
            <h3 className="mt-4 font-bold text-lg">Paneer Tikka</h3>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition">
            <img src="images/dish3.jpg" alt="Dish" className="rounded w-full h-40 object-cover" />
            <h3 className="mt-4 font-bold text-lg">Hyderabadi Biryani</h3>
          </div>
        </div>

        <Link href="/menu/main">
          <button className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition">
            See Full Menu
          </button>
        </Link>
      </section>
    </>
  );
}

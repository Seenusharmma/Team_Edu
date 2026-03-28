"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { theme } from "../../lib/theme";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Course = {
  title: string;
  category: string;
  price: string;
  image: string;
  duration: string;
  lectures: string;
  bg: string;
};

const courses: Course[] = [
  {
    title: "Google Ads & PPC Campaigns",
    category: "Marketing",
    price: "$140.00",
    image: "/courses/c1.png",
    duration: "3hr 35min",
    lectures: "25 lectures",
    bg: "bg-[#BFE3E8]",
  },
  {
    title: "Introduction to Design Systems",
    category: "UI/UX Design",
    price: "$150.00",
    image: "/courses/c2.png",
    duration: "3hr 35min",
    lectures: "25 lectures",
    bg: "bg-[#C7C9F4]",
  },
  {
    title: "HTML, CSS, and Beyond",
    category: "Development",
    price: "$180.00",
    image: "/courses/c3.png",
    duration: "4hr 35min",
    lectures: "30 lectures",
    bg: "bg-[#D3C3F4]",
  },
];

export default function CourseSlider() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray}`}>
      <div className={theme.layout.container}>

        {/* Slider */}
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-2"
        >
          {courses.map((course, i) => (
            <SwiperSlide key={i} className="py-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className={`bg-white rounded-2xl border ${theme.colors.borderLight} shadow-sm hover:shadow-md overflow-hidden`}
              >

                {/* Image */}
                <div className={`w-full h-48 ${course.bg} flex items-center justify-center`}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={180}
                    height={140}
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-5">

                  {/* Category + Price */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 bg-gray-100 rounded-full ${theme.colors.textSecondary}`}>
                      {course.category}
                    </span>
                    <span className={`font-semibold text-sm ${theme.colors.primaryText}`}>
                      {course.price}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`mt-3 font-semibold ${theme.colors.textDark} line-clamp-1`}>
                    {course.title}
                  </h3>

                  {/* Info */}
                  <div className={`flex items-center justify-between mt-4 text-xs ${theme.colors.textMuted}`}>
                    <span>⏱ {course.duration}</span>
                    <span>📚 {course.lectures}</span>
                  </div>

                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button className={`flex items-center gap-2 ${theme.colors.primary} text-white px-6 py-3 rounded-full text-sm ${theme.colors.primaryHover} transition`}>
            View All Courses
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, GraduationCap, Building2, Users, Globe, School } from "lucide-react";
import { theme } from "../../lib/theme";

type UserType = {
  name: string;
  role: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
  stats: string;
  color: string;
};

const users: UserType[] = [
  { 
    name: "Schools & Colleges", 
    role: "Traditional educational institutions", 
    icon: <GraduationCap size={32} />,
    bgColor: "bg-white",
    iconBg: "bg-zinc-900", // Dark icon background for a "premium" pop
    stats: "50K+ Students",
    color: "text-zinc-900"
  },
  { 
    name: "Coaching Institutes", 
    role: "Test prep & skill development", 
    icon: <School size={32} />,
    bgColor: "bg-zinc-50",
    iconBg: "bg-zinc-800",
    stats: "200+ Centers",
    color: "text-zinc-800"
  },
  { 
    name: "Government Systems", 
    role: "State & central education depts", 
    icon: <Building2 size={32} />,
    bgColor: "bg-white",
    iconBg: "bg-zinc-900",
    stats: "1000+ Schools",
    color: "text-zinc-900"
  },
  { 
    name: "NGOs", 
    role: "Educational non-profits", 
    icon: <Users size={32} />,
    bgColor: "bg-zinc-50",
    iconBg: "bg-zinc-800",
    stats: "50+ Partners",
    color: "text-zinc-800"
  },
  { 
    name: "Universities", 
    role: "Higher education institutions", 
    icon: <Globe size={32} />,
    bgColor: "bg-white",
    iconBg: "bg-zinc-900",
    stats: "30+ Universities",
    color: "text-zinc-900"
  },
  { 
    name: "Skill Centers", 
    role: "Vocational training centers", 
    icon: <Building2 size={32} />,
    bgColor: "bg-zinc-50",
    iconBg: "bg-zinc-800",
    stats: "500+ Centers",
    color: "text-zinc-800"
  },
];

export default function MentorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!isPaused) {
        scrollPos += 1;
        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollPos;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const handlePrev = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgLight} overflow-hidden`}>
      <div className={`${theme.layout.container} text-center`}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-1 ${theme.colors.primaryBgLight} ${theme.colors.primaryText} text-xs font-semibold rounded-full mb-4`}>
            OUR PARTNERS
          </span>
          <h2 className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}>
            Who We Serve
          </h2>
          <p className={`mt-4 ${theme.colors.textSecondary} max-w-xl mx-auto ${theme.typography.bodyText}`}>
            Empowering institutions across India's education ecosystem with intelligent AI infrastructure
          </p>
        </motion.div>

        {/* Swipeable Container */}
        <div 
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-all -ml-4 md:ml-0"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-all -mr-4 md:mr-0"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>

          {/* Scrollable Cards - Double the items for infinite loop */}
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-8 md:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* First Set */}
            {users.map((user, i) => (
              <motion.div
                key={`first-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative min-w-[300px] flex-shrink-0 cursor-pointer"
              >
                <div className={`relative ${user.bgColor} rounded-3xl p-6 border border-gray-200 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300`}>
                  
                  {/* Top Color Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${user.iconBg}`} />
                  
                  {/* Icon Container */}
                  <div className="relative flex items-center gap-4 mb-5">
                    <div className={`w-16 h-16 rounded-2xl ${user.iconBg} flex items-center justify-center shadow-md`}>
                      <div className="text-white">
                        {user.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full bg-white ${user.color} text-xs font-semibold shadow-sm`}>
                        {user.stats}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {user.role}
                  </p>

                  {/* Bottom Action */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, idx) => (
                          <div key={idx} className={`w-7 h-7 rounded-full ${user.iconBg} border-2 border-white`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">+99</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${user.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate Set for Infinite Loop */}
            {users.map((user, i) => (
              <motion.div
                key={`second-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative min-w-[300px] flex-shrink-0 cursor-pointer"
              >
                <div className={`relative ${user.bgColor} rounded-3xl p-6 border border-gray-200 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300`}>
                  
                  {/* Top Color Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${user.iconBg}`} />
                  
                  {/* Icon Container */}
                  <div className="relative flex items-center gap-4 mb-5">
                    <div className={`w-16 h-16 rounded-2xl ${user.iconBg} flex items-center justify-center shadow-md`}>
                      <div className="text-white">
                        {user.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full bg-white ${user.color} text-xs font-semibold shadow-sm`}>
                        {user.stats}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {user.role}
                  </p>

                  {/* Bottom Action */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, idx) => (
                          <div key={idx} className={`w-7 h-7 rounded-full ${user.iconBg} border-2 border-white`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">+99</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${user.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <button className={`group relative inline-flex items-center gap-3 ${theme.colors.primary} text-white px-8 py-4 rounded-full text-sm font-semibold ${theme.colors.primaryHover} transition-all duration-300 shadow-lg hover:shadow-xl`}>
            <span>Partner With Us</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
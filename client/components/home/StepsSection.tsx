"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { theme } from "../../lib/theme";

export default function StepsSection() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} bg-white`}>
      <div
        className={`${theme.layout.container} grid lg:grid-cols-2 gap-12 items-center`}
      >
        {/* LEFT IMAGES */}
        <div className="relative flex justify-center lg:justify-start w-full">

          {/* Wrapper for better responsiveness */}
          <div className="relative w-full max-w-md sm:max-w-lg">

            {/* Top Image */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative w-[80%] sm:w-[70%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl z-10"
            >
              <Image
                src="/team3.jpg"
                alt="student working"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
            </motion.div>

            {/* Bottom Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute bottom-[-40px] right-0 w-[75%] sm:w-[65%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg z-0"
            >
              <Image
                src="/team2.webp"
                alt="team learning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 75vw, 35vw"
              />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute top-2 sm:top-4 right-[-10px] sm:right-[-20px] bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 z-20"
            >
              <span
                className={`text-xs sm:text-sm font-medium ${theme.colors.textDark}`}
              >
                🏫 1000+ Schools
              </span>

              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>

              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs text-white ${theme.colors.primary}`}
              >
                +
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="mt-10 lg:mt-0">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}
          >
            How It Works
          </motion.h2>

          {/* Steps */}
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Collect Data",
                desc: "Student performance, attendance, and learning patterns",
                color: "bg-green-100 text-green-600",
                icon: "📊",
              },
              {
                title: "Process with AI",
                desc: "Analyze using advanced AI & RAG systems",
                color: "bg-pink-100 text-pink-600",
                icon: "🤖",
              },
              {
                title: "Generate Insights",
                desc: "Identify strengths, weaknesses, and opportunities",
                color: "bg-purple-100 text-purple-600",
                icon: "💡",
              },
              {
                title: "Take Action",
                desc: "Improve learning outcomes with smart recommendations",
                color: "bg-blue-100 text-blue-600",
                icon: "🚀",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-full text-xl ${item.color}`}
                >
                  {item.icon}
                </div>

                <div>
                  <h4 className={`font-semibold ${theme.colors.textDark}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${theme.colors.textMuted} mt-1`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
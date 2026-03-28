"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { theme } from "../../lib/theme";

const highlights = [
  {
    title: "Reduce Manual Workload",
    icon: "⚡",
    color: "bg-green-100",
  },
  {
    title: "Improve Learning Outcomes",
    icon: "📈",
    color: "bg-blue-100",
  },
  {
    title: "Data-Driven Decisions",
    icon: "🎯",
    color: "bg-purple-100",
  },
  {
    title: "Personalized at Scale",
    icon: "🌍",
    color: "bg-yellow-100",
  },
];

export default function BlogSection() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray}`}>
      <div className={theme.layout.container}>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}>
            About Siksha
          </h2>
          <p className={`mt-3 ${theme.colors.textSecondary} max-w-2xl mx-auto ${theme.typography.bodyText}`}>
            Transforming Education Beyond Classrooms
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className={`${theme.colors.textSecondary} leading-relaxed ${theme.typography.bodyText}`}>
              Siksha is not just another EdTech platform—it is a complete education 
              infrastructure system designed to solve real challenges in learning environments.
            </p>

            <p className={`mt-4 ${theme.colors.textSecondary} leading-relaxed ${theme.typography.bodyText}`}>
              We work at the intersection of <span className="font-semibold text-gray-800">Education + AI + Data</span>, 
              enabling institutions to reduce manual workload, improve learning outcomes, make 
              data-driven decisions, and deliver personalized education at scale.
            </p>

            <div className={`mt-6 p-4 ${theme.colors.primaryBgLight} rounded-xl border border-green-200`}>
              <p className={`${theme.colors.primaryText} font-medium text-sm md:text-base`}>
                Our Mission: Make quality education efficient, accessible, and intelligent for every student.
              </p>
            </div>
          </motion.div>

          {/* RIGHT - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-xl border ${theme.colors.borderLight} p-4 shadow-sm hover:shadow-md transition flex items-center gap-4 sm:flex-col sm:items-start`}
              >
                <div className={`w-10 h-10 shrink-0 ${item.color} rounded-lg flex items-center justify-center text-xl sm:mb-2`}>
                  {item.icon}
                </div>
                <h4 className={`font-semibold ${theme.colors.textDark} text-sm`}>
                  {item.title}
                </h4>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`mt-16 text-center p-8 ${theme.colors.brandGradient} rounded-2xl shadow-sm`}
        >
          <h3 className={`text-xl md:text-2xl font-bold ${theme.colors.textDark}`}>
            Our Vision
          </h3>
          <p className={`mt-3 text-gray-700 max-w-2xl mx-auto ${theme.typography.bodyText}`}>
            To become the backbone of intelligent education systems in India—where every student 
            gets personalized guidance, every teacher is empowered by AI, and every institution 
            operates efficiently.
          </p>
          <button className={`mt-6 flex items-center gap-2 ${theme.colors.primary} text-white px-6 py-3 rounded-full text-sm font-medium ${theme.colors.primaryHover} transition mx-auto shadow-sm`}>
            Learn More About Us
            <ArrowUpRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { theme } from "../../lib/theme";

export default function CourseSection() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray}`}>
      <div className={`${theme.layout.containerSmall} text-center`}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}
        >
          Our Core Solutions
        </motion.h2>

        <p className={`mt-3 ${theme.colors.textSecondary} max-w-xl mx-auto ${theme.typography.bodyText}`}>
          Transform your institution with AI-powered education infrastructure
        </p>

        {/* Solutions Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* AI Paper Evaluation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-white border ${theme.colors.borderLight} rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full`}
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
              🤖
            </div>
            <h3 className={`text-lg font-semibold ${theme.colors.textDark}`}>
              AI Paper Evaluation
            </h3>
            <p className={`mt-2 text-sm ${theme.colors.textSecondary} grow`}>
              Automate answer sheet checking with precision and speed. Reduce teacher workload by up to 80%.
            </p>
            <ul className={`mt-4 space-y-1.5 text-xs ${theme.colors.textMuted}`}>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Instant evaluation & feedback</li>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Scalable for exams</li>
            </ul>
          </motion.div>

          {/* Smart Test Series */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white border ${theme.colors.borderLight} rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full`}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
              📚
            </div>
            <h3 className={`text-lg font-semibold ${theme.colors.textDark}`}>
              Smart Test Series (RAG-Based)
            </h3>
            <p className={`mt-2 text-sm ${theme.colors.textSecondary} grow`}>
              Next-generation test systems powered by AI with personalized question generation.
            </p>
            <ul className={`mt-4 space-y-1.5 text-xs ${theme.colors.textMuted}`}>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Adaptive difficulty levels</li>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Real-time insights</li>
            </ul>
          </motion.div>

          {/* Classroom Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-white border ${theme.colors.borderLight} rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full`}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
              📊
            </div>
            <h3 className={`text-lg font-semibold ${theme.colors.textDark}`}>
              Classroom Monitoring
            </h3>
            <p className={`mt-2 text-sm ${theme.colors.textSecondary} grow`}>
              Track and improve both student and teacher performance with analytics.
            </p>
            <ul className={`mt-4 space-y-1.5 text-xs ${theme.colors.textMuted}`}>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Attendance tracking</li>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Government school optimization</li>
            </ul>
          </motion.div>

          {/* AI Personal Mentor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-white border ${theme.colors.borderLight} rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full`}
          >
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
              🧠
            </div>
            <h3 className={`text-lg font-semibold ${theme.colors.textDark}`}>
              AI Personal Mentor
            </h3>
            <p className={`mt-2 text-sm ${theme.colors.textSecondary} grow`}>
              A smart assistant that guides students like a personal coach with personalized plans.
            </p>
            <ul className={`mt-4 space-y-1.5 text-xs ${theme.colors.textMuted}`}>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Weak area detection</li>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Career guidance</li>
            </ul>
          </motion.div>

          {/* Education Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`bg-white border ${theme.colors.borderLight} rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full sm:col-span-2 lg:col-span-1`}
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0">
              🏫
            </div>
            <h3 className={`text-lg font-semibold ${theme.colors.textDark}`}>
              Education Infrastructure
            </h3>
            <p className={`mt-2 text-sm ${theme.colors.textSecondary} grow`}>
              Partner with institutions to digitize and optimize their systems end-to-end.
            </p>
            <ul className={`mt-4 space-y-1.5 text-xs ${theme.colors.textMuted}`}>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> AI + manual consulting</li>
              <li className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Fast deployment</li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
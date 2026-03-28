"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { theme } from "../../lib/theme";

export default function CTASection() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray}`}>
      <div className={theme.layout.containerSmall}>

        {/* Gradient Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-8 md:p-12 text-center ${theme.colors.brandGradient} shadow-sm`}
        >

          {/* Heading */}
          <h2 className={`${theme.typography.sectionHeading} ${theme.colors.textDark} leading-tight`}>
            Ready to Transform Education?
          </h2>

          {/* Subtext */}
          <p className={`mt-4 ${theme.colors.textSecondary} max-w-xl mx-auto ${theme.typography.bodyText}`}>
            Join Siksha and bring the future of learning to your institution.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

            <button className={`w-full sm:w-auto px-8 py-3.5 ${theme.colors.primary} text-white rounded-full text-base font-medium ${theme.colors.primaryHover} transition`}>
              Request a Demo
            </button>

            <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 bg-white/80 backdrop-blur px-8 py-3.5 rounded-full text-base font-medium hover:bg-black hover:text-white transition">
              Partner With Us
              <ArrowUpRight size={16} />
            </button>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
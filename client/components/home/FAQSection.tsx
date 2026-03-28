"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { theme } from "../../lib/theme";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How does AI Paper Evaluation work?",
    answer:
      "Our AI system automatically grades answer sheets with 95%+ accuracy, providing instant feedback to students and reducing teacher workload by up to 80%.",
  },
  {
    question: "Can Siksha integrate with existing school systems?",
    answer:
      "Yes, Siksha is designed to integrate seamlessly with existing education management systems, ERPs, and Learning Management Systems.",
  },
  {
    question: "Is the platform suitable for government schools?",
    answer:
      "Absolutely! Siksha is specifically built for India's education ecosystem, including government schools, with features optimized for large-scale deployment.",
  },
  {
    question: "What kind of data insights does Siksha provide?",
    answer:
      "We provide comprehensive analytics on student performance, attendance patterns, teacher effectiveness, and institutional metrics for data-driven decision making.",
  },
  {
    question: "How quickly can an institution get started?",
    answer:
      "Most institutions are up and running within 2-4 weeks with our fast deployment process and dedicated support team.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray}`}>
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}>
          Frequently Asked Questions
        </h2>

        <p className={`mt-3 ${theme.colors.textSecondary} ${theme.typography.bodyText} max-w-xl mx-auto`}>
          Frequently Asked Questions offers quick answers to common queries,
          guiding users through features and functionalities effortlessly.
        </p>

        {/* FAQ List */}
        <div className="mt-10 space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`border rounded-xl p-4 transition ${
                  isActive
                    ? `bg-white shadow-sm ${theme.colors.borderLight}`
                    : `bg-white ${theme.colors.borderLight}`
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span
                    className={`font-medium ${
                      isActive ? theme.colors.primaryText : theme.colors.textDark
                    }`}
                  >
                    {faq.question}
                  </span>

                  {isActive ? (
                    <Minus className={theme.colors.primaryText} size={18} />
                  ) : (
                    <Plus className={theme.colors.textMuted} size={18} />
                  )}
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={`mt-3 text-sm ${theme.colors.textSecondary} leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
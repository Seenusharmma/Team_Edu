"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

const contactInfo = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    value: "hello@siksha.ai",
    description: "We reply within 24 hours",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visit Us",
    value: "India",
    description: "Our headquarters",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Working Hours",
    value: "9:00 - 18:00",
    description: "Monday to Friday",
  },
];

const socialLinks = [
  {
    name: "Twitter",
    href: "#twitter",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#linkedin",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#github",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: theme.colors.pageBackground }}>
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${theme.colors.accentSoft} 0%, transparent 50%)`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 70% 80%, ${theme.colors.accentWarm} 0%, transparent 40%)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-6"
              style={{ 
                backgroundColor: theme.colors.accentSoft,
                color: theme.colors.accent,
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Let&apos;s Connect
            </div>
            <h1 
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: theme.colors.textPrimary }}
            >
              Get in <span style={{ color: theme.colors.accent }}>Touch</span>
            </h1>
            <p 
              className="mx-auto max-w-2xl text-lg sm:text-xl"
              style={{ color: theme.colors.textSecondary }}
            >
              Have a question or want to collaborate? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <div 
                className="rounded-3xl p-8 h-full"
                style={{ 
                  backgroundColor: theme.colors.white,
                  boxShadow: theme.shadows.laptop,
                }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: theme.colors.textPrimary }}>
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div 
                        className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: theme.colors.accentSoft }}
                      >
                        <div style={{ color: theme.colors.accent }}>{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: theme.colors.textPrimary }}>{item.title}</h3>
                        <p className="text-sm font-medium" style={{ color: theme.colors.accent }}>{item.value}</p>
                        <p className="text-sm" style={{ color: theme.colors.textMuted }}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t" style={{ borderColor: theme.colors.inkOverlay }}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: theme.colors.textSecondary }}>
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
                        style={{
                          backgroundColor: theme.colors.whiteSoft,
                          color: theme.colors.textSecondary,
                          boxShadow: theme.shadows.screen,
                        }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div 
                className="rounded-3xl p-8 sm:p-10"
                style={{ 
                  backgroundColor: theme.colors.white,
                  boxShadow: theme.shadows.laptop,
                }}
              >
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div 
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                      style={{ backgroundColor: theme.colors.accentSoft }}
                    >
                      <svg className="h-10 w-10" fill="none" stroke={theme.colors.accent} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: theme.colors.textPrimary }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="peer w-full rounded-2xl border-2 bg-transparent px-5 py-4 text-sm outline-none transition-all duration-200"
                          style={{
                            borderColor: focusedField === "name" ? theme.colors.accent : theme.colors.whiteBorder,
                            color: theme.colors.textPrimary,
                          }}
                          placeholder=" "
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-5 top-4 text-sm transition-all duration-200 pointer-events-none"
                          style={{ color: theme.colors.textMuted }}
                        >
                          <span className={focusedField === "name" || formData.name ? "hidden" : ""}>Your Name</span>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="peer w-full rounded-2xl border-2 bg-transparent px-5 py-4 text-sm outline-none transition-all duration-200"
                          style={{
                            borderColor: focusedField === "email" ? theme.colors.accent : theme.colors.whiteBorder,
                            color: theme.colors.textPrimary,
                          }}
                          placeholder=" "
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-5 top-4 text-sm transition-all duration-200 pointer-events-none"
                          style={{ color: theme.colors.textMuted }}
                        >
                          <span className={focusedField === "email" || formData.email ? "hidden" : ""}>Email Address</span>
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="peer w-full rounded-2xl border-2 bg-transparent px-5 py-4 text-sm outline-none transition-all duration-200"
                        style={{
                          borderColor: focusedField === "subject" ? theme.colors.accent : theme.colors.whiteBorder,
                          color: theme.colors.textPrimary,
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="subject"
                        className="absolute left-5 top-4 text-sm transition-all duration-200 pointer-events-none"
                        style={{ color: theme.colors.textMuted }}
                      >
                        <span className={focusedField === "subject" || formData.subject ? "hidden" : ""}>Subject</span>
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className="peer w-full rounded-2xl border-2 bg-transparent px-5 py-4 text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          borderColor: focusedField === "message" ? theme.colors.accent : theme.colors.whiteBorder,
                          color: theme.colors.textPrimary,
                        }}
                        placeholder=" "
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-5 top-4 text-sm transition-all duration-200 pointer-events-none"
                        style={{ color: theme.colors.textMuted }}
                      >
                        <span className={focusedField === "message" || formData.message ? "hidden" : ""}>Your Message</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-300 hover:shadow-lg"
                      style={{
                        backgroundColor: theme.colors.accent,
                        color: theme.colors.white,
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div 
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.chocolate} 100%)`,
                        }}
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;

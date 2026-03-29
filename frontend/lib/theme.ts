export const theme = {
  colors: {
    pageBackground: "#f6efe6",
    textPrimary: "#1c140f",
    textSecondary: "#4f4036",
    textMuted: "#7b6556",
    accent: "#9d5f37",
    accentSoft: "rgba(244, 201, 139, 0.35)",
    accentWarm: "rgba(207, 141, 99, 0.25)",
    white: "#ffffff",
    whiteSoft: "rgba(255, 255, 255, 0.95)",
    whiteOverlay: "rgba(255, 255, 255, 0.85)",
    whiteGlass: "rgba(255, 255, 255, 0.35)",
    whiteBorder: "rgba(255, 255, 255, 0.6)",
    inkSoft: "#201913",
    inkOverlay: "rgba(28, 20, 15, 0.08)",
    buttonHover: "#35271f",
  },
  gradients: {
    heroBackground:
      "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(246,239,230,0.9) 35%, rgba(228,210,189,0.88) 100%)",
  },
  shadows: {
    nav: "0 18px 50px rgba(79,54,37,0.12)",
    button: "0 16px 32px rgba(28,20,15,0.18)",
    laptop: "0 30px 80px rgba(79,54,37,0.18)",
    screen: "0 10px 35px rgba(0,0,0,0.22)",
  },
} as const;

export type AppTheme = typeof theme;

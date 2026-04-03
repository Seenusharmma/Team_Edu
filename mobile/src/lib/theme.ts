export const theme = {
  colors: {
    pageBackground: '#f6efe6',
    textPrimary: '#1c140f',
    textSecondary: '#4f4036',
    textMuted: '#7b6556',
    accent: '#9d5f37',
    accentSoft: 'rgba(244, 201, 139, 0.35)',
    accentWarm: 'rgba(207, 141, 99, 0.25)',
    white: '#ffffff',
    whiteSoft: 'rgba(255, 255, 255, 0.95)',
    whiteOverlay: 'rgba(255, 255, 255, 0.85)',
    whiteGlass: 'rgba(255, 255, 255, 0.35)',
    whiteBorder: 'rgba(255, 255, 255, 0.6)',
    inkSoft: '#201913',
    inkOverlay: 'rgba(28, 20, 15, 0.08)',
    buttonHover: '#35271f',
    chocolate: '#2d1f1a',
    chocolateDark: '#1a1210',
    cardBackground: '#f0ebe1',
    success: '#2f8f5b',
  },
  shadows: {
    nav: {
      shadowColor: '#4f3625',
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.12,
      shadowRadius: 25,
      elevation: 8,
    },
    card: {
      shadowColor: '#1c140f',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
    button: {
      shadowColor: '#9d5f37',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.22,
      shadowRadius: 18,
      elevation: 6,
    },
  },
} as const;

export type AppTheme = typeof theme;

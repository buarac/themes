// Utilitaires pour la génération de thèmes à partir de couleurs de base

/**
 * Convertit une couleur hex vers oklch
 */
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  // Conversion simplifiée - en production, utiliser une lib comme culori
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  // Conversion approximative RGB vers OKLCH
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  const c = Math.sqrt(Math.pow(r - l, 2) + Math.pow(g - l, 2) + Math.pow(b - l, 2)) * 0.3;
  const h = Math.atan2(g - l, r - l) * 180 / Math.PI;
  
  return { l, c, h: h < 0 ? h + 360 : h };
}

/**
 * Parse une couleur OKLCH ou convertit depuis hex
 */
function parseColor(color: string): { l: number; c: number; h: number } {
  if (color.startsWith('oklch(')) {
    // Extraire les valeurs OKLCH
    const match = color.match(/oklch\(([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\)/);
    if (match) {
      const l = parseFloat(match[1].replace('%', '')) / (match[1].includes('%') ? 100 : 1);
      const c = parseFloat(match[2]);
      const h = parseFloat(match[3]);
      return { l, c, h };
    }
  }
  
  // Fallback vers hex
  return hexToOklch(color);
}

/**
 * Génère des variantes d'une couleur de base
 */
function generateVariants(baseColor: string) {
  const oklch = parseColor(baseColor);
  
  return {
    // Couleur de base
    base: `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    
    // Variantes de luminosité
    lighter: `oklch(${Math.min(1, oklch.l + 0.2).toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    light: `oklch(${Math.min(1, oklch.l + 0.1).toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    dark: `oklch(${Math.max(0, oklch.l - 0.1).toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    darker: `oklch(${Math.max(0, oklch.l - 0.2).toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    
    // Variantes de saturation
    muted: `oklch(${oklch.l.toFixed(3)} ${(oklch.c * 0.3).toFixed(3)} ${oklch.h.toFixed(1)})`,
    vibrant: `oklch(${oklch.l.toFixed(3)} ${Math.min(0.4, oklch.c * 1.5).toFixed(3)} ${oklch.h.toFixed(1)})`,
    
    // Pour le texte
    foreground: oklch.l > 0.5 ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)',
  };
}

/**
 * Génère un thème complet à partir de deux couleurs principales
 */
export function generateTheme(primaryColor: string, secondaryColor: string) {
  const primary = generateVariants(primaryColor);
  const secondary = generateVariants(secondaryColor);
  
  return {
    light: {
      // Couleurs principales
      primary: primary.base,
      'primary-foreground': primary.foreground,
      secondary: secondary.lighter,
      'secondary-foreground': secondary.foreground,
      
      // Couleurs d'interface
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.145 0 0)',
      card: 'oklch(1 0 0)',
      'card-foreground': 'oklch(0.145 0 0)',
      popover: 'oklch(1 0 0)',
      'popover-foreground': 'oklch(0.145 0 0)',
      
      // Couleurs neutres basées sur la couleur primaire
      muted: primary.muted,
      'muted-foreground': 'oklch(0.556 0 0)',
      accent: secondary.muted,
      'accent-foreground': secondary.foreground,
      
      // Couleurs système
      destructive: 'oklch(0.577 0.245 27.325)',
      border: 'oklch(0.922 0 0)',
      input: 'oklch(0.922 0 0)',
      ring: primary.muted,
    },
    
    dark: {
      // Couleurs principales
      primary: primary.light,
      'primary-foreground': 'oklch(0.145 0 0)',
      secondary: secondary.dark,
      'secondary-foreground': 'oklch(0.985 0 0)',
      
      // Couleurs d'interface
      background: 'oklch(0.145 0 0)',
      foreground: 'oklch(0.985 0 0)',
      card: 'oklch(0.205 0 0)',
      'card-foreground': 'oklch(0.985 0 0)',
      popover: 'oklch(0.205 0 0)',
      'popover-foreground': 'oklch(0.985 0 0)',
      
      // Couleurs neutres
      muted: 'oklch(0.269 0 0)',
      'muted-foreground': 'oklch(0.708 0 0)',
      accent: secondary.darker,
      'accent-foreground': 'oklch(0.985 0 0)',
      
      // Couleurs système
      destructive: 'oklch(0.704 0.191 22.216)',
      border: 'oklch(1 0 0 / 10%)',
      input: 'oklch(1 0 0 / 15%)',
      ring: primary.muted,
    }
  };
}

/**
 * Applique un thème généré au DOM
 */
export function applyTheme(theme: ReturnType<typeof generateTheme>, mode: 'light' | 'dark') {
  const root = document.documentElement;
  const colors = theme[mode];
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

/**
 * Thèmes prédéfinis avec leurs couleurs de base
 */
export const PREDEFINED_THEMES = [
  {
    name: "Default",
    value: "default",
    primary: "#0f172a",
    secondary: "#64748b"
  },
  {
    name: "Produire",
    value: "produire",
    primary: "oklch(55.56% 0.101 187.12)",
    secondary: "oklch(66.18% 0.089 187.27)"
  },
  {
    name: "Comprendre",
    value: "comprendre",
    primary: "oklch(75.88% 0.163 67.94)",
    secondary: "oklch(45.6% 0.095 187.06)"
  },
  {
    name: "Optimiser",
    value: "optimiser",
    primary: "oklch(55.87% 0.136 263.59)",
    secondary: "oklch(67.92% 0.112 236.64)"
  },
  {
    name: "Ocean",
    value: "ocean",
    primary: "#0ea5e9", // sky-500
    secondary: "#06b6d4"  // cyan-500
  },
  {
    name: "Forest",
    value: "forest", 
    primary: "#16a34a", // green-600
    secondary: "#65a30d"  // lime-600
  },
  {
    name: "Sunset",
    value: "sunset",
    primary: "#ea580c", // orange-600
    secondary: "#dc2626"  // red-600
  }
] as const;
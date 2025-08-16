// Générateur de thèmes complets avec OKLCH, polices, espacement, rayons et ombres

/**
 * Interface pour un thème complet
 */
export interface ThemeConfig {
  name: string;
  baseColor: string; // Couleur OKLCH de base
  font: string;
  spacing: SpacingScale;
  radius: RadiusScale;
  shadow: ShadowScale;
}

export type SpacingScale = 'tight' | 'normal' | 'relaxed';
export type RadiusScale = 'sharp' | 'rounded' | 'soft' | 'full';
export type ShadowScale = 'none' | 'subtle' | 'medium' | 'strong';

/**
 * Parse une couleur OKLCH
 */
function parseOklch(oklchString: string): { l: number; c: number; h: number } {
  if (oklchString.startsWith('oklch(')) {
    const match = oklchString.match(/oklch\(([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\)/);
    if (match) {
      const l = parseFloat(match[1].replace('%', '')) / (match[1].includes('%') ? 100 : 1);
      const c = parseFloat(match[2]);
      const h = parseFloat(match[3]);
      return { l, c, h };
    }
  }
  
  // Format simple : "50% 0.1 200"
  const values = oklchString.split(/\s+/);
  if (values.length === 3) {
    const l = parseFloat(values[0].replace('%', '')) / (values[0].includes('%') ? 100 : 1);
    const c = parseFloat(values[1]);
    const h = parseFloat(values[2]);
    return { l, c, h };
  }
  
  // Fallback
  return { l: 0.5, c: 0.1, h: 200 };
}

/**
 * Génère 9 couleurs fondamentales à partir d'une couleur de base OKLCH
 */
function generateColorPalette(baseOklch: string) {
  const base = parseOklch(baseOklch);
  
  const formatOklch = (l: number, c: number, h: number) => 
    `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${h.toFixed(0)})`;
  
  return {
    // 1. Primary - Couleur de base
    primary: formatOklch(base.l, base.c, base.h),
    
    // 2. Secondary - Teinte complémentaire (-30°)
    secondary: formatOklch(base.l + 0.1, base.c * 0.8, (base.h - 30 + 360) % 360),
    
    // 3. Accent - Teinte contrastée (+120°)
    accent: formatOklch(base.l + 0.05, base.c * 1.2, (base.h + 120) % 360),
    
    // 4. Muted - Version désaturée
    muted: formatOklch(base.l + 0.15, base.c * 0.2, base.h),
    
    // 5. Success - Vert (120°-140°)
    success: formatOklch(0.65, 0.15, 130),
    
    // 6. Warning - Orange (60°-80°)
    warning: formatOklch(0.75, 0.18, 70),
    
    // 7. Danger - Rouge (20°-40°)
    danger: formatOklch(0.60, 0.20, 30),
    
    // 8. Info - Bleu (240°-260°)
    info: formatOklch(0.70, 0.15, 250),
    
    // 9. Neutral - Gris neutre
    neutral: formatOklch(0.65, 0.02, base.h)
  };
}

/**
 * Génère les échelles d'espacement
 */
function generateSpacing(scale: SpacingScale) {
  const scales = {
    tight: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem' },
    normal: { xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    relaxed: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem' }
  };
  return scales[scale];
}

/**
 * Génère les rayons de bordure
 */
function generateRadius(scale: RadiusScale) {
  const scales = {
    sharp: { sm: '0', md: '0', lg: '0', full: '0' },
    rounded: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem', full: '0.5rem' },
    soft: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', full: '1rem' },
    full: { sm: '0.5rem', md: '0.75rem', lg: '1rem', full: '9999px' }
  };
  return scales[scale];
}

/**
 * Génère les ombres
 */
function generateShadows(scale: ShadowScale) {
  const scales = {
    none: { sm: 'none', md: 'none', lg: 'none', xl: 'none' },
    subtle: { 
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', 
      md: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
      lg: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
      xl: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
    },
    medium: { 
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
    },
    strong: { 
      sm: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
      md: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
      lg: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
      xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)' 
    }
  };
  return scales[scale];
}

/**
 * Génère un thème complet à partir de la configuration
 */
export function generateTheme(config: ThemeConfig) {
  const colors = generateColorPalette(config.baseColor);
  const spacing = generateSpacing(config.spacing);
  const radius = generateRadius(config.radius);
  const shadows = generateShadows(config.shadow);
  
  return {
    name: config.name,
    colors,
    spacing,
    radius,
    shadows,
    font: config.font,
    
    // CSS Variables
    cssVariables: {
      // Couleurs
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-accent': colors.accent,
      '--color-muted': colors.muted,
      '--color-success': colors.success,
      '--color-warning': colors.warning,
      '--color-danger': colors.danger,
      '--color-info': colors.info,
      '--color-neutral': colors.neutral,
      
      // Espacement
      '--spacing-xs': spacing.xs,
      '--spacing-sm': spacing.sm,
      '--spacing-md': spacing.md,
      '--spacing-lg': spacing.lg,
      '--spacing-xl': spacing.xl,
      
      // Rayons
      '--radius-sm': radius.sm,
      '--radius-md': radius.md,
      '--radius-lg': radius.lg,
      '--radius-full': radius.full,
      
      // Ombres
      '--shadow-sm': shadows.sm,
      '--shadow-md': shadows.md,
      '--shadow-lg': shadows.lg,
      '--shadow-xl': shadows.xl,
      
      // Police
      '--font-family': config.font
    }
  };
}

/**
 * Applique un thème généré au DOM
 */
export function applyTheme(theme: ReturnType<typeof generateTheme>) {
  const root = document.documentElement;
  
  // Appliquer toutes les variables CSS
  Object.entries(theme.cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Appliquer la police à la page entière
  root.style.setProperty('font-family', theme.font);
  
  // Mettre à jour les composants spécifiques de prévisualisation
  updatePreviewComponents(theme);
}

/**
 * Met à jour les composants de prévisualisation avec le nouveau thème
 */
function updatePreviewComponents(theme: ReturnType<typeof generateTheme>) {
  // Mettre à jour les boutons de couleur
  const colorButtons = document.querySelectorAll('[data-preview="color-button"]');
  colorButtons.forEach((button, index) => {
    const colorNames = Object.keys(theme.colors);
    const colorName = colorNames[index];
    if (colorName && button instanceof HTMLElement) {
      button.style.backgroundColor = theme.colors[colorName as keyof typeof theme.colors];
      button.style.borderRadius = theme.radius.md;
      button.style.boxShadow = theme.shadows.sm;
      button.style.fontFamily = theme.font;
    }
  });
  
  // Mettre à jour les alertes
  const alerts = document.querySelectorAll('[data-preview="alert"]');
  alerts.forEach((alert) => {
    if (alert instanceof HTMLElement) {
      alert.style.borderRadius = theme.radius.md;
      alert.style.fontFamily = theme.font;
    }
  });
  
  // Mettre à jour les cards avec formulaires
  const cards = document.querySelectorAll('[data-preview="card"]');
  cards.forEach((card, index) => {
    if (card instanceof HTMLElement) {
      const colorNames = ['primary', 'secondary', 'accent', 'muted'];
      const colorName = colorNames[index];
      
      // Mettre à jour la card elle-même
      card.style.borderRadius = theme.radius.lg;
      card.style.boxShadow = theme.shadows.md;
      card.style.fontFamily = theme.font;
      
      // Mettre à jour le titre de couleur
      const title = card.querySelector('h3');
      if (title && colorName) {
        title.style.color = theme.colors[colorName as keyof typeof theme.colors];
      }
      
      // Mettre à jour les inputs
      const inputs = card.querySelectorAll('input');
      inputs.forEach((input) => {
        if (input instanceof HTMLElement) {
          input.style.borderRadius = theme.radius.sm;
          input.style.fontFamily = theme.font;
        }
      });
      
      // Mettre à jour le bouton
      const button = card.querySelector('button');
      if (button && colorName) {
        button.style.backgroundColor = theme.colors[colorName as keyof typeof theme.colors];
        button.style.borderRadius = theme.radius.sm;
        button.style.boxShadow = theme.shadows.sm;
        button.style.fontFamily = theme.font;
      }
    }
  });
}

/**
 * Génère le code CSS complet pour un thème
 */
export function generateCSSCode(theme: ReturnType<typeof generateTheme>) {
  const variables = Object.entries(theme.cssVariables)
    .map(([property, value]) => `    ${property}: ${value};`)
    .join('\n');
    
  return `@layer base {
  :root {
${variables}
  }
}`;
}

/**
 * Polices prédéfinies
 */
export const PREDEFINED_FONTS = [
  { name: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { name: 'Roboto', value: 'Roboto, system-ui, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", system-ui, sans-serif' },
  { name: 'Lato', value: 'Lato, system-ui, sans-serif' },
  { name: 'Poppins', value: 'Poppins, system-ui, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, system-ui, sans-serif' },
  { name: 'Source Sans Pro', value: '"Source Sans Pro", system-ui, sans-serif' },
  { name: 'System UI', value: 'system-ui, -apple-system, sans-serif' }
] as const;

/**
 * Configuration par défaut
 */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  name: "Mon Thème",
  baseColor: "oklch(60% 0.15 220)",
  font: "Inter, system-ui, sans-serif",
  spacing: "normal",
  radius: "rounded",
  shadow: "medium"
};

/**
 * Anciennes constantes pour compatibilité
 */
export const PREDEFINED_THEMES = [
  {
    name: "Default",
    value: "default",
    primary: "oklch(60% 0.15 220)",
    secondary: "oklch(70% 0.12 190)"
  }
] as const;
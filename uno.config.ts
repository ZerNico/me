import { defineConfig, presetIcons, presetUno, transformerVariantGroup, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        dark: '[data-theme="dark"]',
        light: '[data-theme="light"]',
      },
    }),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  rules: [[/^animate-spin-(\d+)$/, ([, d]) => ({ animation: `spin ${d}ms linear infinite` })]],
  theme: {
    fontFamily: {
      sans: `"Space Grotesk Variable",${presetUno()?.theme?.fontFamily?.sans}`,
    },
    colors: {
      foreground: 'hsl(var(--foreground))',
      background: 'hsl(var(--background))',
      mutedForeground: 'hsl(var(--muted-foreground))',
      mutedBackground: 'hsl(var(--muted-background))',
      primaryForeground: 'hsl(var(--primary-foreground))',
      primaryBackground: 'hsl(var(--primary-background))',
      primaryBackgroundActive: 'hsl(var(--primary-background-active))',
      secondaryForeground: 'hsl(var(--secondary-foreground))',
      secondaryBackground: 'hsl(var(--secondary-background))',
      secondaryBackgroundActive: 'hsl(var(--secondary-background-active))',
      grayForeground: 'hsl(var(--gray-foreground))',
      grayBackground: 'hsl(var(--gray-background))',
    },
  },
})

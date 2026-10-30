import localFont from 'next/font/local';

/**
 * Archivo (latin, variable width + weight) through next/font: the file is
 * preloaded in <head> and gets a size-matched fallback, so text paints in its
 * final metrics sooner. Other subsets (latin-ext, vietnamese) still come from
 * @fontsource-variable/archivo as 'Archivo Variable', listed after it.
 *
 * fonts/archivo-latin-var.woff2 is the @fontsource latin wdth file cut to the
 * axis ranges the CSS uses (width 80-100%, weight 400-800): 56 KB instead of
 * 90 KB. Regenerate with fontTools.varLib.instancer if the design needs a
 * wider range.
 */
export const archivo = localFont({
  src: './fonts/archivo-latin-var.woff2',
  variable: '--font-archivo',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  preload: true,
  declarations: [{ prop: 'font-stretch', value: '80% 100%' }],
  adjustFontFallback: 'Arial',
});

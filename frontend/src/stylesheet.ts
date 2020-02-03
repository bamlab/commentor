/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 */
const SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';

/**
 * Do not use directly the colorPalette in your components
 * Create an entry in the colorUsage below instead
 */
const colorPalette = {
  greyLight: '#e0e0e0',
  greyDark: '#595959',
  white: '#FFFFFF',
  brown: '#4C3F36',
  darkCerulean: '#134074',
  blackTransparent: 'rgba(0, 0, 0, 0.24)',
};

const mainTheme = {
  primary: '#134074',
  transparentPrimary: 'rgb(19, 64, 116, 0.24)',
  translucidPrimary: 'rgb(19, 64, 116, 0.05)',
};
/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  headerBackground: mainTheme.transparentPrimary,
  primaryTextColor: colorPalette.greyDark,
  shadow: colorPalette.greyLight,
  primary: mainTheme.primary,
  oddLineColor: mainTheme.translucidPrimary,
  evenLineColor: colorPalette.white,
  linkColor: colorPalette.greyDark,
  linkColorHover: mainTheme.transparentPrimary,
  linkColorDisabled: colorPalette.greyLight,
  primaryButtonColor: colorPalette.white,
  primaryButtonBackground: mainTheme.primary,
  primaryButtonBackgroundHover: mainTheme.transparentPrimary,
  primaryButtonBackgroundDisabled: colorPalette.greyLight,
  loaderColorDefault: mainTheme.transparentPrimary,
  error: colorPalette.brown,
  inputBackground: colorPalette.white,
  inputBorderColor: colorPalette.blackTransparent,
  inputPlaceholderColor: colorPalette.blackTransparent,
};

export const fontFamily = {
  main: `'Lato', 'Helvetica', 'Arial', sans-serif`,
  code: 'Monospace',
};

export const fontSize = {
  XXLarge: '60px',
  large: '24px',
  medium: '16px',
  small: '14px',
  XSmall: '12px',
  XXSmall: '8px',
};

export const fontWeight = {
  bold: '700',
  normal: '400',
  light: '300',
};

export const lineHeight = {
  large: '36px',
  medium: '24px',
  small: '12px',
};

export const borderRadius = {
  medium: '4px',
  large: '10px',
};

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

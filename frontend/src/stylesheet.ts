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
  vermillon: '#F24333',
  blackTransparent: 'rgba(0, 0, 0, 0.24)',
  middleGreen: '#5b855f',
  grannySmithGreen: '#A0D891',
};

const mainTheme = {
  primary: '#F24333',
  transparentPrimary: 'rgb(242, 42, 51, 0.24)',
  translucidPrimary: 'rgb(242, 42, 51, 0.05)',
};
/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  headerBackground: mainTheme.transparentPrimary,
  primaryTextColor: colorPalette.greyDark,
  primary: mainTheme.primary,
  oddLineColor: mainTheme.translucidPrimary,
  evenLineColor: colorPalette.white,
  linkColor: colorPalette.greyDark,
  linkColorHover: colorPalette.grannySmithGreen,
  linkColorDisabled: colorPalette.greyLight,
  primaryButtonColor: colorPalette.white,
  primaryButtonBackground: mainTheme.primary,
  primaryButtonBackgroundHover: colorPalette.grannySmithGreen,
  primaryButtonBackgroundDisabled: colorPalette.greyLight,
  loaderColorDefault: colorPalette.grannySmithGreen,
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

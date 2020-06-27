const SPACING_UNIT = 8;
const MEASUREMENT_UNIT = 'px';

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

const colorPalette = {
  mineShaft: '#222222',
  silver: '#c4c4c4',
  lightGray: '#f7f7f7',
  dustyGray: '#979797',
  mercury: '#e3e3e3',
  purple: '#8968BA',
  red: '#E55E5E',
  lightBlue: '#BCCEE0',
  transparentMineShaft: 'rgba(34,34,34,0.1)',
  white: '#FFF',
};

export const colorUsage = {
  text: colorPalette.mineShaft,
  buttonText: colorPalette.white,
  hoverButtonColor: colorPalette.lightBlue,
  icon: colorPalette.silver,
  background: colorPalette.lightGray,
  placeHolderText: colorPalette.dustyGray,
  lines: colorPalette.mercury,
  shadow: colorPalette.transparentMineShaft,
  highlight: colorPalette.purple,
  disabled: colorPalette.silver,
  error: colorPalette.red,
};

export const fontFamily = 'Muli';

export const fontStyles = {
  title: {
    fontFamily,
    fontWeight: 900,
    fontSize: '36px',
  },
  subTitle: {
    fontFamily,
    fontWeight: 800,
    fontSize: '24px',
  },
  buttons: {
    fontFamily,
    fontWeight: 800,
    fontSize: '18px',
  },
  small: {
    fontFamily,
    fontWeight: 400,
    fontSize: '12px',
  },
  regular: {
    fontFamily,
    fontWeight: 400,
    fontSize: '16px',
  },
  bold: {
    fontFamily,
    fontWeight: 700,
    fontSize: '16px',
  },
};

export const borderRadius = '4px';

/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme');
const { Colors } = require('@blueprintjs/core');

console.log('tailwind TAILWIND_MODE =>', process.env.TAILWIND_MODE);
console.log('tailwind NODE_ENV =>', process.env.NODE_ENV);

// https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
const rgba = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

module.exports = {
  theme: {
    fontSize: {
      '128/16': '8rem', // 9xl
      '96/16': '6rem', // 8xl
      '72/16': '4.5rem', // 7xl
      '60/16': '3.75rem', // 6xl
      '48/16': '3rem', // 5xl
      '36/16': '2.25rem', // 4xl

      '32/16': '2rem',
      '31/16': '1.938rem',
      '30/16': '1.875rem', // 3xl
      '29/16': '1.813rem',
      '28/16': '1.75rem',
      '27/16': '1.688rem',
      '26/16': '1.625rem',
      '25/16': '1.563rem',
      '24/16': '1.5rem', // 2xl
      '23/16': '1.438rem',
      '22/16': '1.375rem',
      '21/16': '1.313rem',
      '20/16': '1.25rem', // xl
      '19/16': '1.188rem',
      '18/16': '1.125rem', // lg
      '17/16': '1.063rem',

      '16/16': '1rem', // base
      '15/16': '.938rem',
      '14/16': '.875rem', // sm
      '13/16': '.813rem',
      '12/16': '.75rem', // xs
      '11/16': '.688rem',
      '10/16': '.625rem',
      '9/16': '.563rem',
      '8/16': '.5rem',
      '7/16': '.438rem',
      '6/16': '.375rem',
      '5/16': '.313rem',
      '4/16': '.25rem',
      '3/16': '.188rem',
      '2/16': '.125rem',
      '1/16': '.063rem',
    },

    fontWeight: {
      100: 100,
      // 200: 200, // proxima nova not support
      300: 300,
      400: 400,
      // 500: 500, // proxima nova not support
      600: 600,
      700: 700,
      800: 800,
      900: 900,
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: Colors.BLACK,
      white: Colors.WHITE,

      primary: Colors.BLUE3,
      success: Colors.GREEN3,
      warning: Colors.ORANGE3,
      danger: Colors.RED3,

      'dark-gray':  { 1: Colors.DARK_GRAY1,  2: Colors.DARK_GRAY2,  3: Colors.DARK_GRAY3,  4: Colors.DARK_GRAY4,  5: Colors.DARK_GRAY5 },
      gray:         { 1: Colors.GRAY1,       2: Colors.GRAY2,       3: Colors.GRAY3,       4: Colors.GRAY4,       5: Colors.GRAY5 },
      'light-gray': { 1: Colors.LIGHT_GRAY1, 2: Colors.LIGHT_GRAY2, 3: Colors.LIGHT_GRAY3, 4: Colors.LIGHT_GRAY4, 5: Colors.LIGHT_GRAY5 },
      blue:         { 1: Colors.BLUE1,       2: Colors.BLUE2,       3: Colors.BLUE3,       4: Colors.BLUE4,       5: Colors.BLUE5 },
      green:        { 1: Colors.GREEN1,      2: Colors.GREEN2,      3: Colors.GREEN3,      4: Colors.GREEN4,      5: Colors.GREEN5 },
      orange:       { 1: Colors.ORANGE1,     2: Colors.ORANGE2,     3: Colors.ORANGE3,     4: Colors.ORANGE4,     5: Colors.ORANGE5 },
      red:          { 1: Colors.RED1,        2: Colors.RED2,        3: Colors.RED3,        4: Colors.RED4,        5: Colors.RED5 },
      vermilion:    { 1: Colors.VERMILION1,  2: Colors.VERMILION2,  3: Colors.VERMILION3,  4: Colors.VERMILION4,  5: Colors.VERMILION5 },
      rose:         { 1: Colors.ROSE1,       2: Colors.ROSE2,       3: Colors.ROSE3,       4: Colors.ROSE4,       5: Colors.ROSE5 },
      violet:       { 1: Colors.VIOLET1,     2: Colors.VIOLET2,     3: Colors.VIOLET3,     4: Colors.VIOLET4,     5: Colors.VIOLET5 },
      indigo:       { 1: Colors.INDIGO1,     2: Colors.INDIGO2,     3: Colors.INDIGO3,     4: Colors.INDIGO4,     5: Colors.INDIGO5 },
      cobalt:       { 1: Colors.COBALT1,     2: Colors.COBALT2,     3: Colors.COBALT3,     4: Colors.COBALT4,     5: Colors.COBALT5 },
      turquoise:    { 1: Colors.TURQUOISE1,  2: Colors.TURQUOISE2,  3: Colors.TURQUOISE3,  4: Colors.TURQUOISE4,  5: Colors.TURQUOISE5 },
      forest:       { 1: Colors.FOREST1,     2: Colors.FOREST2,     3: Colors.FOREST3,     4: Colors.FOREST4,     5: Colors.FOREST5 },
      lime:         { 1: Colors.LIME1,       2: Colors.LIME2,       3: Colors.LIME3,       4: Colors.LIME4,       5: Colors.LIME5 },
      gold:         { 1: Colors.GOLD1,       2: Colors.GOLD2,       3: Colors.GOLD3,       4: Colors.GOLD4,       5: Colors.GOLD5 },
      sepia:        { 1: Colors.SEPIA1,      2: Colors.SEPIA2,      3: Colors.SEPIA3,      4: Colors.SEPIA4,      5: Colors.SEPIA5 },
    },

    extend: {
      fontFamily: {
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },

      spacing: {
        13: '3.25rem',
        15: '3.75rem',
      },

      zIndex: {
        1: '1',
      },

      textColor: {
        link: Colors.BLUE2,
        heading: Colors.DARK_GRAY1,
        muted: Colors.GRAY1,
        disabled: rgba(Colors.GRAY1, 0.6),
      },

      divideColor: {
        DEFAULT: rgba(Colors.BLACK, 0.15),
      },

      transitionProperty: {
        width: 'width',
      },

      minHeight: (theme) => ({
        ...theme('spacing'),
      }),

      minWidth: (theme) => ({
        ...theme('spacing'),
      }),

      maxHeight: (theme) => ({
        ...theme('spacing'),
      }),

      maxWidth: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },

  variants: {
    extend: {
      padding: ['first', 'last'],
      backgroundColor: ['active', 'odd', 'even'],
      borderWidth: ['odd', 'even'],
      cursor: ['hover'],
    },
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',

    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx}',
    ],

    options: {
      keyframes: true,
      variables: true,
      rejected: true,
    },
  },
};

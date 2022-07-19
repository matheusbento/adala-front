export const colors: any = {
  default: '#393839',
  primary: '#205ea8',
  primaryHover: '#2e7ad1',
  warning: '#f5a505',
  success: '#6dac10',
  successHover: '#89d815',
  danger: '#f51c05',
  negative: '#ffffff',
  silver: '#ccc',
  blueLight: '#a9c8ed',
  blue: '#2876d3',
  blueDarkest: '#011021',
  green: '#89d815',
  purpleLight: '#887afc',
  greyLightest: '#f0f0f0',
  greyLighter: '#e6e7e8',
  greyLight: '#d1d3d4',
  greyIcon: '#a7a9ac',
  grey: '#a7a9ac',
  greyLabel: '#808285',
  greyDark: '#808285',
  greyDarker: '#58595b',
  greyDarkest: '#393839',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.1)',
  redLight: '#e0b4b4',
  redLightest: '#fff6f6',
  redDark: '#db2828',
  red: '#9f3a38',
  white: '#ffffff',
  purple: '#887cf9',
  transparent: 'transparent',
};

const breakPoints: any = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const spacing: any = {
  none: '0',
  xxxs: '.125rem', // 2px
  xxs: '.25rem', // 4px
  xs: '.5rem', // 8px
  s: '1rem', // 16px
  m: '1.5rem', // 24px
  l: '2rem', // 32px
  xl: '2.5rem', // 40px
  xxl: '3rem', // 48px
};

export const fontSizes: any = {
  xxxs: { fontSize: '.625rem !important' }, // 10px
  xxs: { fontSize: '.75rem !important' }, // 12px
  xs: { fontSize: '.875rem !important' }, // 14px
  sm: { fontSize: '1rem !important' }, // 16px
  md: { fontSize: '1.125rem !important' }, // 18px
  lg: { fontSize: '1.375rem !important' }, // 22px
  xl: { fontSize: '2.25rem !important' }, // 36px
  xxl: { fontSize: '2.625rem !important' }, // 42px
};

export const fontWeight: any = {
  normal: 'normal',
  bold: 'bold',
  lighter: 'lighter',
  bolder: 'bolder',
  w100: '100 !important',
  w200: '200 !important',
  w300: '300 !important',
  w400: '400 !important',
  w500: '500 !important',
  w600: '600 !important',
  w700: '700 !important',
  w800: '800 !important',
  w900: '900 !important',
};

export const border: any = {
  roundedTopSm: { borderRadius: '6px 6px 0 0 !important' },
  roundedTop: { borderRadius: '8px 8px 0 0 !important' },
  roundedBottomSm: { borderRadius: '0 0 6px 6px !important' },
  roundedBottom: { borderRadius: '0 0 8px 8px !important' },
  roundedSm: { borderRadius: '6px !important' },
  roundedNone: { borderRadius: '0 !important' },
  rounded: { borderRadius: '8px !important' },
  roundedLg: { borderRadius: '12px !important' },
  round: { borderRadius: '50% !important' },
  none: { border: 'none !important' },
};

export const utils: any = {
  w100: { width: '100% !important' },
  w50: { width: '50% !important' },
  vw100: { width: '100vw !important' },
  h100: { height: '100% !important' },
  mh100: { minHeight: '100% !important' },
  mvh100: { minHeight: '100vh !important' },
};

export const position: any = {
  relative: { position: 'relative !important' },
  absolute: { position: 'absolute !important' },
  fixed: { position: 'fixed !important' },
};

export const text: any = {
  uppercase: { textTransform: 'uppercase !important' },
  lowercase: { textTransform: 'lowercase !important' },
  capitalize: { textTransform: 'capitalize !important' },
  underline: { textDecoration: 'underline !important' },

  center: { textAlign: 'center !important' },
  left: { textAlign: 'left !important' },
  right: { textAlign: 'right !important' },

  smCenter: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      textAlign: 'center !important',
    },
  },
  smLeft: {
    [`@media (min-width: ${breakPoints.sm})`]: { textAlign: 'left !important' },
  },
  smRight: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      textAlign: 'right !important',
    },
  },

  mdCenter: {
    [`@media (min-width: ${breakPoints.md})`]: {
      textAlign: 'center !important',
    },
  },
  mdLeft: {
    [`@media (min-width: ${breakPoints.md})`]: { textAlign: 'left !important' },
  },
  mdRight: {
    [`@media (min-width: ${breakPoints.md})`]: {
      textAlign: 'right !important',
    },
  },

  lgCenter: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      textAlign: 'center !important',
    },
  },
  lgLeft: {
    [`@media (min-width: ${breakPoints.lg})`]: { textAlign: 'left !important' },
  },
  lgRight: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      textAlign: 'right !important',
    },
  },

  xlCenter: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      textAlign: 'center !important',
    },
  },
  xlLeft: {
    [`@media (min-width: ${breakPoints.xl})`]: { textAlign: 'left !important' },
  },
  xlRight: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      textAlign: 'right !important',
    },
  },
};

export const flex: any = {
  // Direction
  row: { flexDirection: 'row !important' },
  rowReverse: { flexDirection: 'row-reverse !important' },
  column: { flexDirection: 'column !important' },
  columnReverse: { flexDirection: 'column-reverse !important' },

  // Justify Content
  justifyContentStart: { justifyContent: 'flex-start !important' },
  justifyContentEnd: { justifyContent: 'flex-end !important' },
  justifyContentCenter: { justifyContent: 'center !important' },
  justifyContentBetween: { justifyContent: 'space-between !important' },
  justifyContentAround: { justifyContent: 'space-around !important' },
  justifyContentEvenly: { justifyContent: 'space-evenly !important' },

  // Align Content
  alignContentStart: { alignContent: 'flex-start !important' },
  alignContentEnd: { alignContent: 'flex-end !important' },
  alignContentCenter: { alignContent: 'center !important' },
  alignContentBetween: { alignContent: 'space-between !important' },
  alignContentAround: { alignContent: 'space-around !important' },
  alignContentStretch: { alignContent: 'stretch !important' },

  // Align items
  alignItemsStart: { alignItems: 'flex-start !important' },
  alignItemsEnd: { alignItems: 'flex-end !important' },
  alignItemsCenter: { alignItems: 'center !important' },
  alignItemsBaseline: { alignItems: 'baseline !important' },
  alignItemsStretch: { alignItems: 'stretch !important' },

  // Align self
  alignSelfStart: { alignSelf: 'flex-start !important' },
  alignSelfEnd: { alignSelf: 'flex-end !important' },
  alignSelfCenter: { alignSelf: 'center !important' },
  alignSelfBaseline: { alignSelf: 'baseline !important' },
  alignSelfStretch: { alignSelf: 'stretch !important' },

  // Fill
  fill: { flex: '1 1 auto !important' },

  // Grow and Shrink
  grow0: { flexGrow: '0 !important' },
  grow1: { flexGrow: '1 !important' },
  shrink0: { flexShrink: '0 !important' },
  shrink1: { flexShrink: '1 !important' },

  // Wrap
  noWrap: { flexWrap: 'nowrap !important' },
  wrap: { flexWrap: 'wrap !important' },
  wrapReverse: { flexWrap: 'wrap-reverse !important' },

  // Order
  order1: { order: '1 !important' },
  order2: { order: '2 !important' },
  order3: { order: '3 !important' },
  order4: { order: '4 !important' },
  order5: { order: '5 !important' },
  order6: { order: '6 !important' },
  order7: { order: '7 !important' },
  order8: { order: '8 !important' },
  order9: { order: '9 !important' },
  order10: { order: '10 !important' },
  order11: { order: '11 !important' },
  order12: { order: '12 !important' },

  smRow: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexDirection: 'row !important',
    },
  },
  smRowReverse: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexDirection: 'row-reverse !important',
    },
  },
  smColumn: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexDirection: 'column !important',
    },
  },
  smColumnReverse: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexDirection: 'column-reverse !important',
    },
  },

  justifyContentSmStart: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      justifyContent: 'flex-start !important',
    },
  },
  justifyContentSmEnd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      justifyContent: 'flex-end !important',
    },
  },
  justifyContentSmCenter: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      justifyContent: 'center !important',
    },
  },
  justifyContentSmBetween: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      justifyContent: 'space-between !important',
    },
  },
  justifyContentSmAround: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      justifyContent: 'space-around !important',
    },
  },

  alignContentSmStart: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignContent: 'flex-start !important',
    },
  },
  alignContentSmEnd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignContent: 'flex-end !important',
    },
  },
  alignContentSmCenter: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignContent: 'center !important',
    },
  },
  alignContentSmBetween: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignContent: 'space-between !important',
    },
  },
  alignContentSmAround: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignContent: 'space-around !important',
    },
  },

  alignItemsSmStart: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignItems: 'flex-start !important',
    },
  },
  alignItemsSmEnd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignItems: 'flex-end !important',
    },
  },
  alignItemsSmCenter: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignItems: 'center !important',
    },
  },
  alignItemsSmBaseline: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignItems: 'baseline !important',
    },
  },
  alignItemsSmStretch: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignItems: 'stretch !important',
    },
  },

  alignSelfSmStart: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignSelf: 'flex-start !important',
    },
  },
  alignSelfSmEnd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignSelf: 'flex-end !important',
    },
  },
  alignSelfSmCenter: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignSelf: 'center !important',
    },
  },
  alignSelfSmBaseline: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignSelf: 'baseline !important',
    },
  },
  alignSelfSmStretch: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      alignSelf: 'stretch !important',
    },
  },

  smFill: {
    [`@media (min-width: ${breakPoints.sm})`]: { flex: '1 1 auto !important' },
  },

  growSm0: {
    [`@media (min-width: ${breakPoints.sm})`]: { flexGrow: '0 !important' },
  },
  growSm1: {
    [`@media (min-width: ${breakPoints.sm})`]: { flexGrow: '1 !important' },
  },
  shrinkSm0: {
    [`@media (min-width: ${breakPoints.sm})`]: { flexShrink: '0 !important' },
  },
  shrinkSm1: {
    [`@media (min-width: ${breakPoints.sm})`]: { flexShrink: '1 !important' },
  },

  smNoWrap: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexWrap: 'nowrap !important',
    },
  },
  smWrap: {
    [`@media (min-width: ${breakPoints.sm})`]: { flexWrap: 'wrap !important' },
  },
  smWrapReverse: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      flexWrap: 'wrap-reverse !important',
    },
  },

  orderSm1: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '1 !important' },
  },
  orderSm2: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '2 !important' },
  },
  orderSm3: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '3 !important' },
  },
  orderSm4: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '4 !important' },
  },
  orderSm5: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '5 !important' },
  },
  orderSm6: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '6 !important' },
  },
  orderSm7: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '7 !important' },
  },
  orderSm8: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '8 !important' },
  },
  orderSm9: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '9 !important' },
  },
  orderSm10: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '10 !important' },
  },
  orderSm11: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '11 !important' },
  },
  orderSm12: {
    [`@media (min-width: ${breakPoints.sm})`]: { order: '12 !important' },
  },

  mdRow: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexDirection: 'row !important',
    },
  },
  mdRowReverse: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexDirection: 'row-reverse !important',
    },
  },
  mdColumn: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexDirection: 'column !important',
    },
  },
  mdColumnReverse: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexDirection: 'column-reverse !important',
    },
  },

  justifyContentMdStart: {
    [`@media (min-width: ${breakPoints.md})`]: {
      justifyContent: 'flex-start !important',
    },
  },
  justifyContentMdEnd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      justifyContent: 'flex-end !important',
    },
  },
  justifyContentMdCenter: {
    [`@media (min-width: ${breakPoints.md})`]: {
      justifyContent: 'center !important',
    },
  },
  justifyContentMdBetween: {
    [`@media (min-width: ${breakPoints.md})`]: {
      justifyContent: 'space-between !important',
    },
  },
  justifyContentMdAround: {
    [`@media (min-width: ${breakPoints.md})`]: {
      justifyContent: 'space-around !important',
    },
  },

  alignContentMdStart: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignContent: 'flex-start !important',
    },
  },
  alignContentMdEnd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignContent: 'flex-end !important',
    },
  },
  alignContentMdCenter: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignContent: 'center !important',
    },
  },
  alignContentMdBetween: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignContent: 'space-between !important',
    },
  },
  alignContentMdAround: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignContent: 'space-around !important',
    },
  },

  alignItemsMdStart: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignItems: 'flex-start !important',
    },
  },
  alignItemsMdEnd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignItems: 'flex-end !important',
    },
  },
  alignItemsMdCenter: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignItems: 'center !important',
    },
  },
  alignItemsMdBaseline: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignItems: 'baseline !important',
    },
  },
  alignItemsMdStretch: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignItems: 'stretch !important',
    },
  },

  alignSelfMdStart: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignSelf: 'flex-start !important',
    },
  },
  alignSelfMdEnd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignSelf: 'flex-end !important',
    },
  },
  alignSelfMdCenter: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignSelf: 'center !important',
    },
  },
  alignSelfMdBaseline: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignSelf: 'baseline !important',
    },
  },
  alignSelfMdStretch: {
    [`@media (min-width: ${breakPoints.md})`]: {
      alignSelf: 'stretch !important',
    },
  },

  mdFill: {
    [`@media (min-width: ${breakPoints.md})`]: { flex: '1 1 auto !important' },
  },

  growMd0: {
    [`@media (min-width: ${breakPoints.md})`]: { flexGrow: '0 !important' },
  },
  growMd1: {
    [`@media (min-width: ${breakPoints.md})`]: { flexGrow: '1 !important' },
  },
  shrinkMd0: {
    [`@media (min-width: ${breakPoints.md})`]: { flexShrink: '0 !important' },
  },
  shrinkMd1: {
    [`@media (min-width: ${breakPoints.md})`]: { flexShrink: '1 !important' },
  },

  mdNoWrap: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexWrap: 'nowrap !important',
    },
  },
  mdWrap: {
    [`@media (min-width: ${breakPoints.md})`]: { flexWrap: 'wrap !important' },
  },
  mdWrapReverse: {
    [`@media (min-width: ${breakPoints.md})`]: {
      flexWrap: 'wrap-reverse !important',
    },
  },

  orderMd1: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '1 !important' },
  },
  orderMd2: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '2 !important' },
  },
  orderMd3: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '3 !important' },
  },
  orderMd4: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '4 !important' },
  },
  orderMd5: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '5 !important' },
  },
  orderMd6: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '6 !important' },
  },
  orderMd7: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '7 !important' },
  },
  orderMd8: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '8 !important' },
  },
  orderMd9: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '9 !important' },
  },
  orderMd10: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '10 !important' },
  },
  orderMd11: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '11 !important' },
  },
  orderMd12: {
    [`@media (min-width: ${breakPoints.md})`]: { order: '12 !important' },
  },

  lgRow: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexDirection: 'row !important',
    },
  },
  lgRowReverse: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexDirection: 'row-reverse !important',
    },
  },
  lgColumn: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexDirection: 'column !important',
    },
  },
  lgColumnReverse: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexDirection: 'column-reverse !important',
    },
  },

  justifyContentLgStart: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      justifyContent: 'flex-start !important',
    },
  },
  justifyContentLgEnd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      justifyContent: 'flex-end !important',
    },
  },
  justifyContentLgCenter: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      justifyContent: 'center !important',
    },
  },
  justifyContentLgBetween: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      justifyContent: 'space-between !important',
    },
  },
  justifyContentLgAround: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      justifyContent: 'space-around !important',
    },
  },

  alignContentLgStart: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignContent: 'flex-start !important',
    },
  },
  alignContentLgEnd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignContent: 'flex-end !important',
    },
  },
  alignContentLgCenter: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignContent: 'center !important',
    },
  },
  alignContentLgBetween: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignContent: 'space-between !important',
    },
  },
  alignContentLgAround: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignContent: 'space-around !important',
    },
  },

  alignItemsLgStart: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignItems: 'flex-start !important',
    },
  },
  alignItemsLgEnd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignItems: 'flex-end !important',
    },
  },
  alignItemsLgCenter: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignItems: 'center !important',
    },
  },
  alignItemsLgBaseline: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignItems: 'baseline !important',
    },
  },
  alignItemsLgStretch: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignItems: 'stretch !important',
    },
  },

  alignSelfLgStart: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignSelf: 'flex-start !important',
    },
  },
  alignSelfLgEnd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignSelf: 'flex-end !important',
    },
  },
  alignSelfLgCenter: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignSelf: 'center !important',
    },
  },
  alignSelfLgBaseline: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignSelf: 'baseline !important',
    },
  },
  alignSelfLgStretch: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      alignSelf: 'stretch !important',
    },
  },

  lgFill: {
    [`@media (min-width: ${breakPoints.lg})`]: { flex: '1 1 auto !important' },
  },

  growLg0: {
    [`@media (min-width: ${breakPoints.lg})`]: { flexGrow: '0 !important' },
  },
  growLg1: {
    [`@media (min-width: ${breakPoints.lg})`]: { flexGrow: '1 !important' },
  },
  shrinkLg0: {
    [`@media (min-width: ${breakPoints.lg})`]: { flexShrink: '0 !important' },
  },
  shrinkLg1: {
    [`@media (min-width: ${breakPoints.lg})`]: { flexShrink: '1 !important' },
  },

  lgNoWrap: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexWrap: 'nowrap !important',
    },
  },
  lgWrap: {
    [`@media (min-width: ${breakPoints.lg})`]: { flexWrap: 'wrap !important' },
  },
  lgWrapReverse: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      flexWrap: 'wrap-reverse !important',
    },
  },

  orderLg1: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '1 !important' },
  },
  orderLg2: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '2 !important' },
  },
  orderLg3: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '3 !important' },
  },
  orderLg4: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '4 !important' },
  },
  orderLg5: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '5 !important' },
  },
  orderLg6: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '6 !important' },
  },
  orderLg7: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '7 !important' },
  },
  orderLg8: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '8 !important' },
  },
  orderLg9: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '9 !important' },
  },
  orderLg10: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '10 !important' },
  },
  orderLg11: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '11 !important' },
  },
  orderLg12: {
    [`@media (min-width: ${breakPoints.lg})`]: { order: '12 !important' },
  },

  xlRow: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexDirection: 'row !important',
    },
  },
  xlRowReverse: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexDirection: 'row-reverse !important',
    },
  },
  xlColumn: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexDirection: 'column !important',
    },
  },
  xlColumnReverse: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexDirection: 'column-reverse !important',
    },
  },

  justifyContentXlStart: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      justifyContent: 'flex-start !important',
    },
  },
  justifyContentXlEnd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      justifyContent: 'flex-end !important',
    },
  },
  justifyContentXlCenter: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      justifyContent: 'center !important',
    },
  },
  justifyContentXlBetween: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      justifyContent: 'space-between !important',
    },
  },
  justifyContentXlAround: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      justifyContent: 'space-around !important',
    },
  },

  alignContentXlStart: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignContent: 'flex-start !important',
    },
  },
  alignContentXlEnd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignContent: 'flex-end !important',
    },
  },
  alignContentXlCenter: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignContent: 'center !important',
    },
  },
  alignContentXlBetween: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignContent: 'space-between !important',
    },
  },
  alignContentXlAround: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignContent: 'space-around !important',
    },
  },

  alignItemsXlStart: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignItems: 'flex-start !important',
    },
  },
  alignItemsXlEnd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignItems: 'flex-end !important',
    },
  },
  alignItemsXlCenter: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignItems: 'center !important',
    },
  },
  alignItemsXlBaseline: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignItems: 'baseline !important',
    },
  },
  alignItemsXlStretch: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignItems: 'stretch !important',
    },
  },

  alignSelfXlStart: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignSelf: 'flex-start !important',
    },
  },
  alignSelfXlEnd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignSelf: 'flex-end !important',
    },
  },
  alignSelfXlCenter: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignSelf: 'center !important',
    },
  },
  alignSelfXlBaseline: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignSelf: 'baseline !important',
    },
  },
  alignSelfXlStretch: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      alignSelf: 'stretch !important',
    },
  },

  xlFill: {
    [`@media (min-width: ${breakPoints.xl})`]: { flex: '1 1 auto !important' },
  },

  growXl0: {
    [`@media (min-width: ${breakPoints.xl})`]: { flexGrow: '0 !important' },
  },
  growXl1: {
    [`@media (min-width: ${breakPoints.xl})`]: { flexGrow: '1 !important' },
  },
  shrinkXl0: {
    [`@media (min-width: ${breakPoints.xl})`]: { flexShrink: '0 !important' },
  },
  shrinkXl1: {
    [`@media (min-width: ${breakPoints.xl})`]: { flexShrink: '1 !important' },
  },

  xlNoWrap: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexWrap: 'nowrap !important',
    },
  },
  xlWrap: {
    [`@media (min-width: ${breakPoints.xl})`]: { flexWrap: 'wrap !important' },
  },
  xlWrapReverse: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      flexWrap: 'wrap-reverse !important',
    },
  },

  orderXl1: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '1 !important' },
  },
  orderXl2: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '2 !important' },
  },
  orderXl3: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '3 !important' },
  },
  orderXl4: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '4 !important' },
  },
  orderXl5: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '5 !important' },
  },
  orderXl6: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '6 !important' },
  },
  orderXl7: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '7 !important' },
  },
  orderXl8: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '8 !important' },
  },
  orderXl9: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '9 !important' },
  },
  orderXl10: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '10 !important' },
  },
  orderXl11: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '11 !important' },
  },
  orderXl12: {
    [`@media (min-width: ${breakPoints.xl})`]: { order: '12 !important' },
  },

  xxlRow: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexDirection: 'row !important',
    },
  },
  xxlRowReverse: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexDirection: 'row-reverse !important',
    },
  },
  xxlColumn: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexDirection: 'column !important',
    },
  },
  xxlColumnReverse: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexDirection: 'column-reverse !important',
    },
  },

  justifyContentXxlStart: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      justifyContent: 'flex-start !important',
    },
  },
  justifyContentXxlEnd: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      justifyContent: 'flex-end !important',
    },
  },
  justifyContentXxlCenter: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      justifyContent: 'center !important',
    },
  },
  justifyContentXxlBetween: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      justifyContent: 'space-between !important',
    },
  },
  justifyContentXxlAround: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      justifyContent: 'space-around !important',
    },
  },

  alignContentXxlStart: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignContent: 'flex-start !important',
    },
  },
  alignContentXxlEnd: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignContent: 'flex-end !important',
    },
  },
  alignContentXxlCenter: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignContent: 'center !important',
    },
  },
  alignContentXxlBetween: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignContent: 'space-between !important',
    },
  },
  alignContentXxlAround: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignContent: 'space-around !important',
    },
  },

  alignItemsXxlStart: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignItems: 'flex-start !important',
    },
  },
  alignItemsXxlEnd: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignItems: 'flex-end !important',
    },
  },
  alignItemsXxlCenter: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignItems: 'center !important',
    },
  },
  alignItemsXxlBaseline: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignItems: 'baseline !important',
    },
  },
  alignItemsXxlStretch: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignItems: 'stretch !important',
    },
  },

  alignSelfXxlStart: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignSelf: 'flex-start !important',
    },
  },
  alignSelfXxlEnd: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignSelf: 'flex-end !important',
    },
  },
  alignSelfXxlCenter: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignSelf: 'center !important',
    },
  },
  alignSelfXxlBaseline: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignSelf: 'baseline !important',
    },
  },
  alignSelfXxlStretch: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      alignSelf: 'stretch !important',
    },
  },

  xxlFill: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flex: '1 1 auto !important' },
  },

  growXxl0: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flexGrow: '0 !important' },
  },
  growXxl1: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flexGrow: '1 !important' },
  },
  shrinkXxl0: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flexShrink: '0 !important' },
  },
  shrinkXxl1: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flexShrink: '1 !important' },
  },

  xxlNoWrap: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexWrap: 'nowrap !important',
    },
  },
  xxlWrap: {
    [`@media (min-width: ${breakPoints.xxl})`]: { flexWrap: 'wrap !important' },
  },
  xxlWrapReverse: {
    [`@media (min-width: ${breakPoints.xxl})`]: {
      flexWrap: 'wrap-reverse !important',
    },
  },

  orderXxl1: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '1 !important' },
  },
  orderXxl2: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '2 !important' },
  },
  orderXxl3: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '3 !important' },
  },
  orderXxl4: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '4 !important' },
  },
  orderXxl5: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '5 !important' },
  },
  orderXxl6: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '6 !important' },
  },
  orderXxl7: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '7 !important' },
  },
  orderXxl8: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '8 !important' },
  },
  orderXxl9: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '9 !important' },
  },
  orderXxl10: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '10 !important' },
  },
  orderXxl11: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '11 !important' },
  },
  orderXxl12: {
    [`@media (min-width: ${breakPoints.xxl})`]: { order: '12 !important' },
  },
};

// display.{screen size?}{property}
// Example: display.smBlock. Display block on small screens.
// Example: display.none; Display none on all screens

export const display: any = {
  none: { display: 'none !important' },
  inline: { display: 'inline !important' },
  block: { display: 'block !important' },
  inlineBlock: { display: 'inline-block !important' },
  tableCell: { display: 'table-cell !important' },
  flex: { display: 'flex !important' },
  inlineFlex: { display: 'inline-flex !important' },
  contents: { display: 'contents !important' },

  smNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { display: 'none !important' },
  },
  smBlock: {
    [`@media (min-width: ${breakPoints.sm})`]: { display: 'block !important' },
  },
  smInline: {
    [`@media (min-width: ${breakPoints.sm})`]: { display: 'inline !important' },
  },
  smInlineBlock: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      display: 'inline-block !important',
    },
  },
  smTableCell: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      display: 'table-cell !important',
    },
  },
  smFlex: {
    [`@media (min-width: ${breakPoints.sm})`]: { display: 'flex !important' },
  },
  smInlineFlex: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      display: 'inline-flex !important',
    },
  },

  mdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { display: 'none !important' },
  },
  mdBlock: {
    [`@media (min-width: ${breakPoints.md})`]: { display: 'block !important' },
  },
  mdInline: {
    [`@media (min-width: ${breakPoints.md})`]: { display: 'inline !important' },
  },
  mdInlineBlock: {
    [`@media (min-width: ${breakPoints.md})`]: {
      display: 'inline-block !important',
    },
  },
  mdTableCell: {
    [`@media (min-width: ${breakPoints.md})`]: {
      display: 'table-cell !important',
    },
  },
  mdFlex: {
    [`@media (min-width: ${breakPoints.md})`]: { display: 'flex !important' },
  },
  mdInlineFlex: {
    [`@media (min-width: ${breakPoints.md})`]: {
      display: 'inline-flex !important',
    },
  },

  lgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { display: 'none !important' },
  },
  lgBlock: {
    [`@media (min-width: ${breakPoints.lg})`]: { display: 'block !important' },
  },
  lgInline: {
    [`@media (min-width: ${breakPoints.lg})`]: { display: 'inline !important' },
  },
  lgInlineBlock: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      display: 'inline-block !important',
    },
  },
  lgTableCell: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      display: 'table-cell !important',
    },
  },
  lgFlex: {
    [`@media (min-width: ${breakPoints.lg})`]: { display: 'flex !important' },
  },
  lgInlineFlex: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      display: 'inline-flex !important',
    },
  },

  xlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { display: 'none !important' },
  },
  xlBlock: {
    [`@media (min-width: ${breakPoints.xl})`]: { display: 'block !important' },
  },
  xlInline: {
    [`@media (min-width: ${breakPoints.xl})`]: { display: 'inline !important' },
  },
  xlInlineBlock: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      display: 'inline-block !important',
    },
  },
  xlTableCell: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      display: 'table-cell !important',
    },
  },
  xlFlex: {
    [`@media (min-width: ${breakPoints.xl})`]: { display: 'flex !important' },
  },
  xlInlineFlex: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      display: 'inline-flex !important',
    },
  },
};

// padding.{direction?}{screen size?}{size}
// Example: padding.topMdSm; Padding Top, medium screen, small size.
// Example: padding.sm; Padding small on all directions and screen sizes.

export const padding: any = {
  none: { padding: `${spacing.none} !important` },
  xxs: { padding: `${spacing.xxs} !important` },
  xs: { padding: `${spacing.xs} !important` },
  sm: { padding: `${spacing.s} !important` },
  md: { padding: `${spacing.m} !important` },
  lg: { padding: `${spacing.l} !important` },
  xl: { padding: `${spacing.xl} !important` },
  xxl: { padding: `${spacing.xxl} !important` },

  topNone: { paddingTop: `${spacing.none} !important` },
  topXxs: { paddingTop: `${spacing.xxs} !important` },
  topXs: { paddingTop: `${spacing.xs} !important` },
  topSm: { paddingTop: `${spacing.s} !important` },
  topMd: { paddingTop: `${spacing.m} !important` },
  topLg: { paddingTop: `${spacing.l} !important` },
  topXl: { paddingTop: `${spacing.xl} !important` },
  topXxl: { paddingTop: `${spacing.xxl} !important` },

  rightNone: { paddingRight: `${spacing.none} !important` },
  rightXxs: { paddingRight: `${spacing.xxs} !important` },
  rightXs: { paddingRight: `${spacing.xs} !important` },
  rightSm: { paddingRight: `${spacing.s} !important` },
  rightMd: { paddingRight: `${spacing.m} !important` },
  rightLg: { paddingRight: `${spacing.l} !important` },
  rightXl: { paddingRight: `${spacing.xl} !important` },
  rightXxl: { paddingRight: `${spacing.xxl} !important` },

  bottomNone: { paddingBottom: `${spacing.none} !important` },
  bottomXxs: { paddingBottom: `${spacing.xxs} !important` },
  bottomXs: { paddingBottom: `${spacing.xs} !important` },
  bottomSm: { paddingBottom: `${spacing.s} !important` },
  bottomMd: { paddingBottom: `${spacing.m} !important` },
  bottomLg: { paddingBottom: `${spacing.l} !important` },
  bottomXl: { paddingBottom: `${spacing.xl} !important` },
  bottomXxl: { paddingBottom: `${spacing.xxl} !important` },

  leftNone: { paddingLeft: `${spacing.none} !important` },
  leftXxs: { paddingLeft: `${spacing.xxs} !important` },
  leftXs: { paddingLeft: `${spacing.xs} !important` },
  leftSm: { paddingLeft: `${spacing.s} !important` },
  leftMd: { paddingLeft: `${spacing.m} !important` },
  leftLg: { paddingLeft: `${spacing.l} !important` },
  leftXl: { paddingLeft: `${spacing.xl} !important` },
  leftXxl: { paddingLeft: `${spacing.xxl} !important` },

  xNone: {
    paddingLeft: `${spacing.none} !important`,
    paddingRight: `${spacing.none} !important`,
  },
  xXxs: {
    paddingLeft: `${spacing.xxs} !important`,
    paddingRight: `${spacing.xxs} !important`,
  },
  xXs: {
    paddingLeft: `${spacing.xs} !important`,
    paddingRight: `${spacing.xs} !important`,
  },
  xSm: {
    paddingLeft: `${spacing.s} !important`,
    paddingRight: `${spacing.s} !important`,
  },
  xMd: {
    paddingLeft: `${spacing.m} !important`,
    paddingRight: `${spacing.m} !important`,
  },
  xLg: {
    paddingLeft: `${spacing.l} !important`,
    paddingRight: `${spacing.l} !important`,
  },
  xXl: {
    paddingLeft: `${spacing.xl} !important`,
    paddingRight: `${spacing.xl} !important`,
  },
  xXxl: {
    paddingLeft: `${spacing.xxl} !important`,
    paddingRight: `${spacing.xxl} !important`,
  },

  yNone: {
    paddingTop: `${spacing.none} !important`,
    paddingBottom: `${spacing.none} !important`,
  },
  yXxs: {
    paddingTop: `${spacing.xxs} !important`,
    paddingBottom: `${spacing.xxs} !important`,
  },
  yXs: {
    paddingTop: `${spacing.xs} !important`,
    paddingBottom: `${spacing.xs} !important`,
  },
  ySm: {
    paddingTop: `${spacing.s} !important`,
    paddingBottom: `${spacing.s} !important`,
  },
  yMd: {
    paddingTop: `${spacing.m} !important`,
    paddingBottom: `${spacing.m} !important`,
  },
  yLg: {
    paddingTop: `${spacing.l} !important`,
    paddingBottom: `${spacing.l} !important`,
  },
  yXl: {
    paddingTop: `${spacing.xl} !important`,
    paddingBottom: `${spacing.xl} !important`,
  },
  yXxl: {
    paddingTop: `${spacing.xxl} !important`,
    paddingBottom: `${spacing.xxl} !important`,
  },

  smNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.none} !important`,
    },
  },
  smXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.xxs} !important`,
    },
  },
  smXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.xs} !important`,
    },
  },
  smSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.s} !important`,
    },
  },
  smMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.m} !important`,
    },
  },
  smLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.l} !important`,
    },
  },
  smXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.xl} !important`,
    },
  },
  smXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      padding: `${spacing.xxl} !important`,
    },
  },

  mdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.none} !important`,
    },
  },
  mdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.xxs} !important`,
    },
  },
  mdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.xs} !important`,
    },
  },
  mdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.s} !important`,
    },
  },
  mdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.m} !important`,
    },
  },
  mdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.l} !important`,
    },
  },
  mdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.xl} !important`,
    },
  },
  mdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      padding: `${spacing.xxl} !important`,
    },
  },

  lgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.none} !important`,
    },
  },
  lgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.xxs} !important`,
    },
  },
  lgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.xs} !important`,
    },
  },
  lgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.s} !important`,
    },
  },
  lgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.m} !important`,
    },
  },
  lgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.l} !important`,
    },
  },
  lgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.xl} !important`,
    },
  },
  lgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      padding: `${spacing.xxl} !important`,
    },
  },

  xlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.none} !important`,
    },
  },
  xlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.xxs} !important`,
    },
  },
  xlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.xs} !important`,
    },
  },
  xlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.s} !important`,
    },
  },
  xlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.m} !important`,
    },
  },
  xlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.l} !important`,
    },
  },
  xlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.xl} !important`,
    },
  },
  xlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      padding: `${spacing.xxl} !important`,
    },
  },

  topSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.none} !important`,
    },
  },
  topSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xxs} !important`,
    },
  },
  topSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xs} !important`,
    },
  },
  topSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.s} !important`,
    },
  },
  topSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.m} !important`,
    },
  },
  topSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.l} !important`,
    },
  },
  topSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xl} !important`,
    },
  },
  topSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xxl} !important`,
    },
  },

  topMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.none} !important`,
    },
  },
  topMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xxs} !important`,
    },
  },
  topMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xs} !important`,
    },
  },
  topMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.s} !important`,
    },
  },
  topMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.m} !important`,
    },
  },
  topMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.l} !important`,
    },
  },
  topMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xl} !important`,
    },
  },
  topMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xxl} !important`,
    },
  },

  topLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.none} !important`,
    },
  },
  topLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xxs} !important`,
    },
  },
  topLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xs} !important`,
    },
  },
  topLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.s} !important`,
    },
  },
  topLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.m} !important`,
    },
  },
  topLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.l} !important`,
    },
  },
  topLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xl} !important`,
    },
  },
  topLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xxl} !important`,
    },
  },

  topXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.none} !important`,
    },
  },
  topXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xxs} !important`,
    },
  },
  topXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xs} !important`,
    },
  },
  topXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.s} !important`,
    },
  },
  topXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.m} !important`,
    },
  },
  topXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.l} !important`,
    },
  },
  topXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xl} !important`,
    },
  },
  topXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xxl} !important`,
    },
  },

  rightSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.none} !important`,
    },
  },
  rightSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  rightSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.xs} !important`,
    },
  },
  rightSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.s} !important`,
    },
  },
  rightSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.m} !important`,
    },
  },
  rightSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.l} !important`,
    },
  },
  rightSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.xl} !important`,
    },
  },
  rightSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  rightMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.none} !important`,
    },
  },
  rightMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  rightMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.xs} !important`,
    },
  },
  rightMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.s} !important`,
    },
  },
  rightMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.m} !important`,
    },
  },
  rightMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.l} !important`,
    },
  },
  rightMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.xl} !important`,
    },
  },
  rightMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  rightLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.none} !important`,
    },
  },
  rightLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  rightLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.xs} !important`,
    },
  },
  rightLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.s} !important`,
    },
  },
  rightLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.m} !important`,
    },
  },
  rightLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.l} !important`,
    },
  },
  rightLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.xl} !important`,
    },
  },
  rightLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  rightXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.none} !important`,
    },
  },
  rightXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  rightXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.xs} !important`,
    },
  },
  rightXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.s} !important`,
    },
  },
  rightXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.m} !important`,
    },
  },
  rightXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.l} !important`,
    },
  },
  rightXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.xl} !important`,
    },
  },
  rightXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  bottomSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.none} !important`,
    },
  },
  bottomSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  bottomSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  bottomSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.s} !important`,
    },
  },
  bottomSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.m} !important`,
    },
  },
  bottomSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.l} !important`,
    },
  },
  bottomSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  bottomSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  bottomMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.none} !important`,
    },
  },
  bottomMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  bottomMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  bottomMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.s} !important`,
    },
  },
  bottomMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.m} !important`,
    },
  },
  bottomMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.l} !important`,
    },
  },
  bottomMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  bottomMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  bottomLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.none} !important`,
    },
  },
  bottomLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  bottomLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  bottomLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.s} !important`,
    },
  },
  bottomLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.m} !important`,
    },
  },
  bottomLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.l} !important`,
    },
  },
  bottomLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  bottomLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  bottomXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.none} !important`,
    },
  },
  bottomXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  bottomXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  bottomXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.s} !important`,
    },
  },
  bottomXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.m} !important`,
    },
  },
  bottomXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.l} !important`,
    },
  },
  bottomXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  bottomXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  leftSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.none} !important`,
    },
  },
  leftSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xxs} !important`,
    },
  },
  leftSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xs} !important`,
    },
  },
  leftSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.s} !important`,
    },
  },
  leftSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.m} !important`,
    },
  },
  leftSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.l} !important`,
    },
  },
  leftSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xl} !important`,
    },
  },
  leftSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xxl} !important`,
    },
  },

  leftMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.none} !important`,
    },
  },
  leftMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xxs} !important`,
    },
  },
  leftMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xs} !important`,
    },
  },
  leftMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.s} !important`,
    },
  },
  leftMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.m} !important`,
    },
  },
  leftMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.l} !important`,
    },
  },
  leftMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xl} !important`,
    },
  },
  leftMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xxl} !important`,
    },
  },

  leftLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.none} !important`,
    },
  },
  leftLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xxs} !important`,
    },
  },
  leftLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xs} !important`,
    },
  },
  leftLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.s} !important`,
    },
  },
  leftLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.m} !important`,
    },
  },
  leftLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.l} !important`,
    },
  },
  leftLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xl} !important`,
    },
  },
  leftLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xxl} !important`,
    },
  },

  leftXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.none} !important`,
    },
  },
  leftXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xxs} !important`,
    },
  },
  leftXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xs} !important`,
    },
  },
  leftXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.s} !important`,
    },
  },
  leftXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.m} !important`,
    },
  },
  leftXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.l} !important`,
    },
  },
  leftXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xl} !important`,
    },
  },
  leftXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xxl} !important`,
    },
  },

  xSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.none} !important`,
      paddingRight: `${spacing.none} !important`,
    },
  },
  xSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xxs} !important`,
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  xSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xs} !important`,
      paddingRight: `${spacing.xs} !important`,
    },
  },
  xSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.s} !important`,
      paddingRight: `${spacing.s} !important`,
    },
  },
  xSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.m} !important`,
      paddingRight: `${spacing.m} !important`,
    },
  },
  xSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.l} !important`,
      paddingRight: `${spacing.l} !important`,
    },
  },
  xSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xl} !important`,
      paddingRight: `${spacing.xl} !important`,
    },
  },
  xSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingLeft: `${spacing.xxl} !important`,
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  xMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.none} !important`,
      paddingRight: `${spacing.none} !important`,
    },
  },
  xMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xxs} !important`,
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  xMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xs} !important`,
      paddingRight: `${spacing.xs} !important`,
    },
  },
  xMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.s} !important`,
      paddingRight: `${spacing.s} !important`,
    },
  },
  xMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.m} !important`,
      paddingRight: `${spacing.m} !important`,
    },
  },
  xMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.l} !important`,
      paddingRight: `${spacing.l} !important`,
    },
  },
  xMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xl} !important`,
      paddingRight: `${spacing.xl} !important`,
    },
  },
  xMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingLeft: `${spacing.xxl} !important`,
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  xLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.none} !important`,
      paddingRight: `${spacing.none} !important`,
    },
  },
  xLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xxs} !important`,
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  xLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xs} !important`,
      paddingRight: `${spacing.xs} !important`,
    },
  },
  xLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.s} !important`,
      paddingRight: `${spacing.s} !important`,
    },
  },
  xLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.m} !important`,
      paddingRight: `${spacing.m} !important`,
    },
  },
  xLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.l} !important`,
      paddingRight: `${spacing.l} !important`,
    },
  },
  xLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xl} !important`,
      paddingRight: `${spacing.xl} !important`,
    },
  },
  xLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingLeft: `${spacing.xxl} !important`,
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  xXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.none} !important`,
      paddingRight: `${spacing.none} !important`,
    },
  },
  xXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xxs} !important`,
      paddingRight: `${spacing.xxs} !important`,
    },
  },
  xXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xs} !important`,
      paddingRight: `${spacing.xs} !important`,
    },
  },
  xXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.s} !important`,
      paddingRight: `${spacing.s} !important`,
    },
  },
  xXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.m} !important`,
      paddingRight: `${spacing.m} !important`,
    },
  },
  xXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.l} !important`,
      paddingRight: `${spacing.l} !important`,
    },
  },
  xXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xl} !important`,
      paddingRight: `${spacing.xl} !important`,
    },
  },
  xXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingLeft: `${spacing.xxl} !important`,
      paddingRight: `${spacing.xxl} !important`,
    },
  },

  ySmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.none} !important`,
      paddingBottom: `${spacing.none} !important`,
    },
  },
  ySmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xxs} !important`,
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  ySmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xs} !important`,
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  ySmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.s} !important`,
      paddingBottom: `${spacing.s} !important`,
    },
  },
  ySmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.m} !important`,
      paddingBottom: `${spacing.m} !important`,
    },
  },
  ySmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.l} !important`,
      paddingBottom: `${spacing.l} !important`,
    },
  },
  ySmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xl} !important`,
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  ySmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      paddingTop: `${spacing.xxl} !important`,
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  yMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.none} !important`,
      paddingBottom: `${spacing.none} !important`,
    },
  },
  yMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xxs} !important`,
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  yMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xs} !important`,
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  yMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.s} !important`,
      paddingBottom: `${spacing.s} !important`,
    },
  },
  yMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.m} !important`,
      paddingBottom: `${spacing.m} !important`,
    },
  },
  yMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.l} !important`,
      paddingBottom: `${spacing.l} !important`,
    },
  },
  yMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xl} !important`,
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  yMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      paddingTop: `${spacing.xxl} !important`,
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  yLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.none} !important`,
      paddingBottom: `${spacing.none} !important`,
    },
  },
  yLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xxs} !important`,
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  yLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xs} !important`,
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  yLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.s} !important`,
      paddingBottom: `${spacing.s} !important`,
    },
  },
  yLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.m} !important`,
      paddingBottom: `${spacing.m} !important`,
    },
  },
  yLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.l} !important`,
      paddingBottom: `${spacing.l} !important`,
    },
  },
  yLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xl} !important`,
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  yLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      paddingTop: `${spacing.xxl} !important`,
      paddingBottom: `${spacing.xxl} !important`,
    },
  },

  yXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.none} !important`,
      paddingBottom: `${spacing.none} !important`,
    },
  },
  yXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xxs} !important`,
      paddingBottom: `${spacing.xxs} !important`,
    },
  },
  yXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xs} !important`,
      paddingBottom: `${spacing.xs} !important`,
    },
  },
  yXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.s} !important`,
      paddingBottom: `${spacing.s} !important`,
    },
  },
  yXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.m} !important`,
      paddingBottom: `${spacing.m} !important`,
    },
  },
  yXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.l} !important`,
      paddingBottom: `${spacing.l} !important`,
    },
  },
  yXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xl} !important`,
      paddingBottom: `${spacing.xl} !important`,
    },
  },
  yXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      paddingTop: `${spacing.xxl} !important`,
      paddingBottom: `${spacing.xxl} !important`,
    },
  },
};

export const margin: any = {
  none: { margin: `${spacing.none} !important` },
  xxs: { margin: `${spacing.xxs} !important` },
  xs: { margin: `${spacing.xs} !important` },
  sm: { margin: `${spacing.s} !important` },
  md: { margin: `${spacing.m} !important` },
  lg: { margin: `${spacing.l} !important` },
  xl: { margin: `${spacing.xl} !important` },
  xxl: { margin: `${spacing.xxl} !important` },

  topAuto: { marginTop: 'auto !important' },
  topNone: { marginTop: `${spacing.none} !important` },
  topXxxs: { marginTop: `${spacing.xxxs} !important` },
  topXxs: { marginTop: `${spacing.xxs} !important` },
  topXs: { marginTop: `${spacing.xs} !important` },
  topSm: { marginTop: `${spacing.s} !important` },
  topMd: { marginTop: `${spacing.m} !important` },
  topLg: { marginTop: `${spacing.l} !important` },
  topXl: { marginTop: `${spacing.xl} !important` },
  topXxl: { marginTop: `${spacing.xxl} !important` },

  rightNone: { marginRight: `${spacing.none} !important` },
  rightAuto: { marginRight: 'auto !important' },
  rightXxxs: { marginRight: `${spacing.xxxs} !important` },
  rightXxs: { marginRight: `${spacing.xxs} !important` },
  rightXs: { marginRight: `${spacing.xs} !important` },
  rightSm: { marginRight: `${spacing.s} !important` },
  rightMd: { marginRight: `${spacing.m} !important` },
  rightLg: { marginRight: `${spacing.l} !important` },
  rightXl: { marginRight: `${spacing.xl} !important` },
  rightXxl: { marginRight: `${spacing.xxl} !important` },

  bottomNone: { marginBottom: `${spacing.none} !important` },
  bottomXxxs: { marginBottom: `${spacing.xxxs} !important` },
  bottomXxs: { marginBottom: `${spacing.xxs} !important` },
  bottomXs: { marginBottom: `${spacing.xs} !important` },
  bottomSm: { marginBottom: `${spacing.s} !important` },
  bottomMd: { marginBottom: `${spacing.m} !important` },
  bottomLg: { marginBottom: `${spacing.l} !important` },
  bottomXl: { marginBottom: `${spacing.xl} !important` },
  bottomXxl: { marginBottom: `${spacing.xxl} !important` },

  leftNone: { marginLeft: `${spacing.none} !important` },
  leftAuto: { marginLeft: 'auto !important' },
  leftXxxs: { marginLeft: `${spacing.xxxs} !important` },
  leftXxs: { marginLeft: `${spacing.xxs} !important` },
  leftXs: { marginLeft: `${spacing.xs} !important` },
  leftSm: { marginLeft: `${spacing.s} !important` },
  leftMd: { marginLeft: `${spacing.m} !important` },
  leftLg: { marginLeft: `${spacing.l} !important` },
  leftXl: { marginLeft: `${spacing.xl} !important` },
  leftXxl: { marginLeft: `${spacing.xxl} !important` },

  xNone: {
    marginLeft: `${spacing.none} !important`,
    marginRight: `${spacing.none} !important`,
  },
  xXxxs: {
    marginLeft: `${spacing.xxxs} !important`,
    marginRight: `${spacing.xxxs} !important`,
  },
  xXxs: {
    marginLeft: `${spacing.xxs} !important`,
    marginRight: `${spacing.xxs} !important`,
  },
  xXs: {
    marginLeft: `${spacing.xs} !important`,
    marginRight: `${spacing.xs} !important`,
  },
  xSm: {
    marginLeft: `${spacing.s} !important`,
    marginRight: `${spacing.s} !important`,
  },
  xMd: {
    marginLeft: `${spacing.m} !important`,
    marginRight: `${spacing.m} !important`,
  },
  xLg: {
    marginLeft: `${spacing.l} !important`,
    marginRight: `${spacing.l} !important`,
  },
  xXl: {
    marginLeft: `${spacing.xl} !important`,
    marginRight: `${spacing.xl} !important`,
  },
  xXxl: {
    marginLeft: `${spacing.xxl} !important`,
    marginRight: `${spacing.xxl} !important`,
  },

  yNone: {
    marginTop: `${spacing.none} !important`,
    marginBottom: `${spacing.none} !important`,
  },
  yXxxs: {
    marginTop: `${spacing.xxxs} !important`,
    marginBottom: `${spacing.xxxs} !important`,
  },
  yXxs: {
    marginTop: `${spacing.xxs} !important`,
    marginBottom: `${spacing.xxs} !important`,
  },
  yXs: {
    marginTop: `${spacing.xs} !important`,
    marginBottom: `${spacing.xs} !important`,
  },
  ySm: {
    marginTop: `${spacing.s} !important`,
    marginBottom: `${spacing.s} !important`,
  },
  yMd: {
    marginTop: `${spacing.m} !important`,
    marginBottom: `${spacing.m} !important`,
  },
  yLg: {
    marginTop: `${spacing.l} !important`,
    marginBottom: `${spacing.l} !important`,
  },
  yXl: {
    marginTop: `${spacing.xl} !important`,
    marginBottom: `${spacing.xl} !important`,
  },
  yXxl: {
    marginTop: `${spacing.xxl} !important`,
    marginBottom: `${spacing.xxl} !important`,
  },

  smNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.none },
  },
  smXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.xxxs },
  },
  smXxs: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.xxs } },
  smXs: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.xs } },
  smSm: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.s } },
  smMd: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.m } },
  smLg: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.l } },
  smXl: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.xl } },
  smXxl: { [`@media (min-width: ${breakPoints.sm})`]: { margin: spacing.xxl } },

  mdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.none },
  },
  mdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.xxxs },
  },
  mdXxs: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.xxs } },
  mdXs: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.xs } },
  mdSm: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.s } },
  mdMd: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.m } },
  mdLg: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.l } },
  mdXl: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.xl } },
  mdXxl: { [`@media (min-width: ${breakPoints.md})`]: { margin: spacing.xxl } },

  lgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.none },
  },
  lgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.xxxs },
  },
  lgXxs: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.xxs } },
  lgXs: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.xs } },
  lgSm: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.s } },
  lgMd: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.m } },
  lgLg: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.l } },
  lgXl: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.xl } },
  lgXxl: { [`@media (min-width: ${breakPoints.lg})`]: { margin: spacing.xxl } },

  xlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.none },
  },
  xlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.xxxs },
  },
  xlXxs: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.xxs } },
  xlXs: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.xs } },
  xlSm: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.s } },
  xlMd: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.m } },
  xlLg: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.l } },
  xlXl: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.xl } },
  xlXxl: { [`@media (min-width: ${breakPoints.xl})`]: { margin: spacing.xxl } },

  topSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.none },
  },
  topSmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.xxxs },
  },
  topSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.xxs },
  },
  topSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.xs },
  },
  topSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.s },
  },
  topSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.m },
  },
  topSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.l },
  },
  topSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.xl },
  },
  topSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginTop: spacing.xxl },
  },

  topMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.none },
  },
  topMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.xxxs },
  },
  topMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.xxs },
  },
  topMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.xs },
  },
  topMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.s },
  },
  topMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.m },
  },
  topMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.l },
  },
  topMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.xl },
  },
  topMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginTop: spacing.xxl },
  },

  topLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.none },
  },
  topLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.xxxs },
  },
  topLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.xxs },
  },
  topLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.xs },
  },
  topLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.s },
  },
  topLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.m },
  },
  topLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.l },
  },
  topLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.xl },
  },
  topLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginTop: spacing.xxl },
  },

  topXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.none },
  },
  topXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.xxxs },
  },
  topXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.xxs },
  },
  topXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.xs },
  },
  topXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.s },
  },
  topXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.m },
  },
  topXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.l },
  },
  topXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.xl },
  },
  topXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginTop: spacing.xxl },
  },

  rightSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.none },
  },
  rightSmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.xxxs },
  },
  rightSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.xxs },
  },
  rightSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.xs },
  },
  rightSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.s },
  },
  rightSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.m },
  },
  rightSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.l },
  },
  rightSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.xl },
  },
  rightSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginRight: spacing.xxl },
  },

  rightMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.none },
  },
  rightMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.xxxs },
  },
  rightMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.xxs },
  },
  rightMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.xs },
  },
  rightMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.s },
  },
  rightMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.m },
  },
  rightMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.l },
  },
  rightMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.xl },
  },
  rightMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginRight: spacing.xxl },
  },

  rightLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.none },
  },
  rightLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.xxxs },
  },
  rightLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.xxs },
  },
  rightLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.xs },
  },
  rightLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.s },
  },
  rightLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.m },
  },
  rightLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.l },
  },
  rightLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.xl },
  },
  rightLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginRight: spacing.xxl },
  },

  rightXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.none },
  },
  rightXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.xxxs },
  },
  rightXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.xxs },
  },
  rightXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.xs },
  },
  rightXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.s },
  },
  rightXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.m },
  },
  rightXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.l },
  },
  rightXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.xl },
  },
  rightXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginRight: spacing.xxl },
  },

  bottomSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.none },
  },
  bottomSmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.xxxs },
  },
  bottomSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.xxs },
  },
  bottomSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.xs },
  },
  bottomSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.s },
  },
  bottomSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.m },
  },
  bottomSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.l },
  },
  bottomSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.xl },
  },
  bottomSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginBottom: spacing.xxl },
  },

  bottomMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.none },
  },
  bottomMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.xxxs },
  },
  bottomMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.xxs },
  },
  bottomMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.xs },
  },
  bottomMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.s },
  },
  bottomMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.m },
  },
  bottomMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.l },
  },
  bottomMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.xl },
  },
  bottomMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginBottom: spacing.xxl },
  },

  bottomLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.none },
  },
  bottomLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.xxxs },
  },
  bottomLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.xxs },
  },
  bottomLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.xs },
  },
  bottomLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.s },
  },
  bottomLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.m },
  },
  bottomLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.l },
  },
  bottomLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.xl },
  },
  bottomLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginBottom: spacing.xxl },
  },

  bottomXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.none },
  },
  bottomXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.xxxs },
  },
  bottomXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.xxs },
  },
  bottomXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.xs },
  },
  bottomXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.s },
  },
  bottomXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.m },
  },
  bottomXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.l },
  },
  bottomXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.xl },
  },
  bottomXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginBottom: spacing.xxl },
  },

  leftSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.none },
  },
  leftSmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.xxxs },
  },
  leftSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.xxs },
  },
  leftSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.xs },
  },
  leftSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.s },
  },
  leftSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.m },
  },
  leftSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.l },
  },
  leftSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.xl },
  },
  leftSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: { marginLeft: spacing.xxl },
  },

  leftMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.none },
  },
  leftMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.xxxs },
  },
  leftMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.xxs },
  },
  leftMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.xs },
  },
  leftMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.s },
  },
  leftMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.m },
  },
  leftMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.l },
  },
  leftMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.xl },
  },
  leftMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: { marginLeft: spacing.xxl },
  },

  leftLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.none },
  },
  leftLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.xxxs },
  },
  leftLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.xxs },
  },
  leftLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.xs },
  },
  leftLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.s },
  },
  leftLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.m },
  },
  leftLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.l },
  },
  leftLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.xl },
  },
  leftLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: { marginLeft: spacing.xxl },
  },

  leftXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.none },
  },
  leftXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.xxxs },
  },
  leftXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.xxs },
  },
  leftXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.xs },
  },
  leftXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.s },
  },
  leftXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.m },
  },
  leftXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.l },
  },
  leftXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.xl },
  },
  leftXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: { marginLeft: spacing.xxl },
  },

  xSmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.none,
      marginRight: spacing.none,
    },
  },
  xSmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.xxxs,
      marginRight: spacing.xxxs,
    },
  },
  xSmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.xxs,
      marginRight: spacing.xxs,
    },
  },
  xSmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.xs,
      marginRight: spacing.xs,
    },
  },
  xSmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.s,
      marginRight: spacing.s,
    },
  },
  xSmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.m,
      marginRight: spacing.m,
    },
  },
  xSmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.l,
      marginRight: spacing.l,
    },
  },
  xSmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.xl,
      marginRight: spacing.xl,
    },
  },
  xSmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginLeft: spacing.xxl,
      marginRight: spacing.xxl,
    },
  },

  xMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.none,
      marginRight: spacing.none,
    },
  },
  xMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.xxxs,
      marginRight: spacing.xxxs,
    },
  },
  xMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.xxs,
      marginRight: spacing.xxs,
    },
  },
  xMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.xs,
      marginRight: spacing.xs,
    },
  },
  xMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.s,
      marginRight: spacing.s,
    },
  },
  xMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.m,
      marginRight: spacing.m,
    },
  },
  xMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.l,
      marginRight: spacing.l,
    },
  },
  xMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.xl,
      marginRight: spacing.xl,
    },
  },
  xMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginLeft: spacing.xxl,
      marginRight: spacing.xxl,
    },
  },

  xLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.none,
      marginRight: spacing.none,
    },
  },
  xLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.xxxs,
      marginRight: spacing.xxxs,
    },
  },
  xLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.xxs,
      marginRight: spacing.xxs,
    },
  },
  xLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.xs,
      marginRight: spacing.xs,
    },
  },
  xLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.s,
      marginRight: spacing.s,
    },
  },
  xLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.m,
      marginRight: spacing.m,
    },
  },
  xLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.l,
      marginRight: spacing.l,
    },
  },
  xLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.xl,
      marginRight: spacing.xl,
    },
  },
  xLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginLeft: spacing.xxl,
      marginRight: spacing.xxl,
    },
  },

  xXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.none,
      marginRight: spacing.none,
    },
  },
  xXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.xxxs,
      marginRight: spacing.xxxs,
    },
  },
  xXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.xxs,
      marginRight: spacing.xxs,
    },
  },
  xXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.xs,
      marginRight: spacing.xs,
    },
  },
  xXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.s,
      marginRight: spacing.s,
    },
  },
  xXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.m,
      marginRight: spacing.m,
    },
  },
  xXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.l,
      marginRight: spacing.l,
    },
  },
  xXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.xl,
      marginRight: spacing.xl,
    },
  },
  xXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginLeft: spacing.xxl,
      marginRight: spacing.xxl,
    },
  },

  ySmNone: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.none,
      marginBottom: spacing.none,
    },
  },
  ySmXxxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.xxxs,
      marginBottom: spacing.xxxs,
    },
  },
  ySmXxs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
  },
  ySmXs: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
  },
  ySmSm: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.s,
      marginBottom: spacing.s,
    },
  },
  ySmMd: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.m,
      marginBottom: spacing.m,
    },
  },
  ySmLg: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.l,
      marginBottom: spacing.l,
    },
  },
  ySmXl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  },
  ySmXxl: {
    [`@media (min-width: ${breakPoints.sm})`]: {
      marginTop: spacing.xxl,
      marginBottom: spacing.xxl,
    },
  },

  yMdNone: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.none,
      marginBottom: spacing.none,
    },
  },
  yMdXxxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.xxxs,
      marginBottom: spacing.xxxs,
    },
  },
  yMdXxs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
  },
  yMdXs: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
  },
  yMdSm: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.s,
      marginBottom: spacing.s,
    },
  },
  yMdMd: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.m,
      marginBottom: spacing.m,
    },
  },
  yMdLg: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.l,
      marginBottom: spacing.l,
    },
  },
  yMdXl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  },
  yMdXxl: {
    [`@media (min-width: ${breakPoints.md})`]: {
      marginTop: spacing.xxl,
      marginBottom: spacing.xxl,
    },
  },

  yLgNone: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.none,
      marginBottom: spacing.none,
    },
  },
  yLgXxxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.xxxs,
      marginBottom: spacing.xxxs,
    },
  },
  yLgXxs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
  },
  yLgXs: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
  },
  yLgSm: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.s,
      marginBottom: spacing.s,
    },
  },
  yLgMd: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.m,
      marginBottom: spacing.m,
    },
  },
  yLgLg: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.l,
      marginBottom: spacing.l,
    },
  },
  yLgXl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  },
  yLgXxl: {
    [`@media (min-width: ${breakPoints.lg})`]: {
      marginTop: spacing.xxl,
      marginBottom: spacing.xxl,
    },
  },

  yXlNone: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.none,
      marginBottom: spacing.none,
    },
  },
  yXlXxxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.xxxs,
      marginBottom: spacing.xxxs,
    },
  },
  yXlXxs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
  },
  yXlXs: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
  },
  yXlSm: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.s,
      marginBottom: spacing.s,
    },
  },
  yXlMd: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.m,
      marginBottom: spacing.m,
    },
  },
  yXlLg: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.l,
      marginBottom: spacing.l,
    },
  },
  yXlXl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
  },
  yXlXxl: {
    [`@media (min-width: ${breakPoints.xl})`]: {
      marginTop: spacing.xxl,
      marginBottom: spacing.xxl,
    },
  },
};

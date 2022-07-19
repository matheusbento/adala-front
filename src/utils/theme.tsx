import * as ThemeConstants from 'utils/themeConstants';

export const {
  display,
  spacing,
  padding,
  margin,
  text,
  fontSizes,
  fontWeight,
  colors,
  utils,
  position,
  border,
  flex,
} = ThemeConstants;

export const hovers = {
  primary: {
    ':hover': {
      color: colors.primary,
    },
  },
};

export const styles = {
  roundedCornersNone: { borderRadius: spacing.none },
  roundedCornersXxs: { borderRadius: spacing.xxs },
  roundedCornersXs: { borderRadius: spacing.xs },
  roundedCornersS: { borderRadius: spacing.s },
  roundedCornersM: { borderRadius: spacing.m },
  roundedCornersL: { borderRadius: spacing.l },
  roundedCornersXl: { borderRadius: spacing.xl },
  roundedCornersXxl: { borderRadius: spacing.xxl },
  pointer: { cursor: 'pointer' },
  shadow: { boxShadow: `0 2px 6px ${colors.shadow}` },
  transition: { transition: 'all 150ms ease-in' },
  fullWidth: { width: '100%' },
  dashedBorder: {
    padding: spacing.xl,
    border: `dashed 1px ${colors.silver}`,
    borderRadius: '5px',
  },
};

export const buttons = {
  block: {
    ...display.block,
    width: '100%',
  },
  pill: {
    display: 'inline-block',
    border: 'none',
    borderRadius: '100px',
    height: '30px',
    lineHeight: '30px',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 30px',
    cursor: 'pointer',
    '&:focus, &:active': {
      outline: 'none',
    },
  },
  pillL: {
    height: '46px',
    lineHeight: '46px',
    fontSize: '18px',
    padding: '0 34px',
  },
  pillS: {
    height: '16px',
    lineHeight: '16px',
    fontSize: '10px',
    padding: '0 16px',
  },
  default: {
    border: `solid 1px ${colors.default} !important`,
    '& span': {
      color: `${colors.default}`,
    },
  },
  primary: {
    backgroundColor: colors.primary,
    color: colors.negative,
    '&:hover': {
      backgroundColor: colors.primaryHover,
      color: colors.negative,
    },
  },
  secondary: {
    backgroundColor: colors.greyLight,
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.greyDark,
      color: colors.white,
    },
  },
  save: {
    border: colors.success,
    backgroundColor: colors.success,
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.successHover,
      color: colors.white,
    },
  },
  plain: {
    border: 'none',
    boxShadow: 'none !important',
    backgroundColor: 'transparent !important',
    ...padding.none,
    color: `${colors.default} !important`,
    fontFamily: 'Avenir Next, Helvetica Neue,Arial,Helvetica,sans-serif',
    lineHeight: 'inherit',
    cursor: 'pointer',
    '&:focus, &:active': {
      outline: 'none',
    },
  },
  mutedOutline: {
    color: colors.grey,
    border: `solid 1px ${colors.grey}`,
    backgroundColor: colors.negative,
    '&:hover': {
      color: colors.primary,
      borderColor: colors.primary,
      '& svg *': {
        fill: colors.primary,
      },
    },
  },
  sm: {
    height: 'auto',
    lineHeight: 'initial',
    ...padding.yXxs,
    ...padding.xSm,
    ...margin.rightXxs,
    ...margin.bottomXxs,
    ...fontSizes.xxs,
  },
  lg: {
    height: '40px !important',
    lineHeight: '40px',
    ...fontSizes.sm,
  },
};

export const overflow = {
  truncate: {
    ...utils.w100,
    ...display.block,
    whiteSpace: 'nowrap !important',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis !important',
    ...padding.rightSm,
  },
};

export const list = {
  row: {
    ...padding.sm,
    ...margin.bottomXs,
    ...border.rounded,
    ...display.flex,
    ...flex.justifyContentBetween,
    ...flex.alignContentCenter,
    border: `solid 1px ${colors.silver} !important`,
  },
};

export const tables = {
  admin: {
    ...margin.topMd,
    ...border.roundedSm,
    border: `1px solid ${colors.greyLighter}`,
    overflow: 'hidden',
    '& > thead': {
      ...fontSizes.sm,
      background: colors.greyLightest,
      fontWeight: fontWeight.bold,
    },
    '& > tbody > tr > td': {
      borderTop: `1px solid ${colors.greyLighter}`,
    },
  },
  vms: {
    ...border.roundedSm,
    border: `1px solid ${colors.greyLighter}`,
    overflow: 'hidden',
    '& > thead': {
      ...fontSizes.sm,
      background: colors.greyLightest,
      fontWeight: fontWeight.bold,
    },
    '& > tfoot': {
      ...fontSizes.sm,
      background: colors.greyLightest,
    },
    '& > tbody > tr > td': {
      borderTop: `1px solid ${colors.greyLighter}`,
    },
  },
  default: {
    width: '100%',
    ...fontSizes.xs,
    borderSpacing: 0,
    '& > thead > tr > th': {
      ...padding.topNone,
      ...padding.xXs,
      ...padding.bottomXs,
      fontWeight: 'bold',
      textAlign: 'left',
      verticalAlign: 'top',
    },
    '& > tbody > tr > td': {
      color: colors.default,
      ...padding.xs,
    },
    '& .no-data': {
      textAlign: 'center',
    },
  },
  paddingSm: {
    '& > tbody > tr > td, & > thead > tr > th': {
      ...padding.sm,
    },
  },
  striped: {
    '& > tbody > tr:nth-of-type(odd) > td': {
      backgroundColor: colors.greyLightest,
    },
  },
};

export const paginations = {
  roundedOptions: {
    ...border.none,
    boxShadow: 'none !important',
    '> .item': {
      ...border.round,
      fontWeight: 'bold !important',
      '&::before': {
        background: 'none !important',
      },
    },
    '> .item + .item': {
      ...margin.leftXs,
    },
    '> .icon.item': {
      ...border.round,
      backgroundColor: `${colors.greyLight} !important`,
      color: `${colors.black} !important`,
    },
    '> .icon.item-inactive': {
      color: `${colors.greyDark} !important`,
    },
    '> .active.item': {
      color: `${colors.white} !important`,
      backgroundColor: `${colors.primary} !important`,
    },
  },
};

export const icons = {
  // TODO: icons from db (https://zube.io/liquidcompass/jobs/c/1784)
  active: {
    name: 'active',
    label: 'Active',
    color: 'success',
    icon: 'icon-checkmark',
  },
  expenseDisputed: {
    name: 'expenseDisputed',
    label: 'Disputed',
    color: 'danger',
    icon: 'icon-archive-line',
  },
  expenseRejected: {
    name: 'expenseRejected',
    label: 'Rejected',
    color: 'danger',
    icon: 'icon-close',
  },
  noExpenses: {
    name: 'no-expenses',
    label: 'No expenses added for [name]',
    color: 'blue',
    icon: 'icon-info',
  },
  onHold: {
    name: 'onHold',
    label: 'On Hold',
    color: 'primary',
    icon: 'icon-clock',
  },
  timeDisputed: {
    name: 'timeDisputed',
    label: 'Disputed time',
    color: 'danger',
    icon: 'icon-clock',
  },
  approvedTimeDisputed: {
    name: 'timeDisputed',
    label: 'Approved disputed time',
    color: 'danger',
    icon: 'icon-clock',
  },
  rejectedTimeDisputed: {
    name: 'timeDisputed',
    label: 'Rejected disputed time',
    color: 'danger',
    icon: 'icon-clock',
  },
  timeHasOvertime: {
    name: 'timeHasOvertime',
    label: 'Overtime',
    color: 'danger',
    icon: 'icon-clock',
  },
  timeHasCallback: {
    name: 'timeHasCallback',
    label: 'Callback',
    color: 'danger',
    icon: 'icon-clock',
  },
  timeHasHoliday: {
    name: 'timeHasHoliday',
    label: 'Holiday',
    color: 'danger',
    icon: 'icon-clock',
  },
  hasTimezoneChange: {
    name: 'hasTimezoneChange',
    label: 'Timezone change',
    color: 'primary',
    icon: 'icon-clock-line',
  },
  confirmed: {
    name: 'confirmed',
    label: 'Confirmed',
    color: 'success',
    icon: 'icon-checkmark',
  },
  null: {
    name: 'null',
    label: 'No info',
    color: 'grey',
    icon: 'icon-close',
  },
  draft: {
    name: 'draft',
    label: 'Draft',
    color: 'warning',
    icon: 'icon-file-line',
  },
  pending: {
    name: 'pending',
    label: 'Pending Approval',
    color: 'warning',
    icon: 'icon-person-add-line',
  },
  pendingConfirmation: {
    name: 'pendingConfirmation',
    label: 'Pending Confirmation',
    color: 'warning',
    icon: 'icon-file-line',
  },
  blocked: {
    name: 'blocked',
    label: 'Blocked',
    color: 'danger',
    icon: 'icon-pause-circle-line',
  },
  invoice: {
    name: 'invoice',
    label: 'Invoice',
    color: 'blue',
    icon: 'icon-invoice',
  },
  expiration: {
    name: 'expiration',
    label: '30-day expiration',
    color: 'warning',
    icon: 'icon-info',
  },
  expired: {
    name: 'expired',
    label: 'expired',
    color: 'danger',
    icon: 'icon-info',
  },
  invoiceEdited: {
    name: 'invoiceEdited',
    label: 'This invoice has been edited',
    color: 'alert',
    icon: 'icon-info',
  },
  timecard: {
    name: 'timecard',
    label: 'Timecard task',
    color: 'blue',
    icon: 'icon-clock',
  },
  onboarding: {
    name: 'onboarding',
    label: 'Onboarding task',
    color: 'blue',
    icon: 'icon-calendar',
  },
  unapproved: {
    name: 'unapproved',
    label: 'Unapproved',
    color: 'blue',
    icon: 'icon-question-mark-line',
  },
  invoiced: {
    name: 'invoiced',
    label: 'Invoiced',
    color: 'blue',
    icon: 'icon-invoice',
  },
  accepted: {
    name: 'accepted',
    label: 'Accepted',
    color: 'success',
    icon: 'icon-checkmark',
  },
  approved: {
    name: 'approved',
    label: 'Approved',
    color: 'success',
    icon: 'icon-checkmark',
  },
  paid: {
    name: 'paid',
    label: 'Paid',
    color: 'success',
    icon: 'icon-checkmark',
  },
  partially_approved: {
    name: 'partially_approved',
    label: 'Partially Approved',
    color: 'red',
    icon: 'icon-question-mark-line',
  },
  partially_disputed: {
    name: 'partially_disputed',
    label: 'Partially Disputed',
    color: 'red',
    icon: 'icon-question-mark-line',
  },
  partially_invoiced: {
    name: 'partially_invoiced',
    label: 'Partially Invoiced',
    color: 'red',
    icon: 'icon-question-mark-line',
  },
  partially_on_hold: {
    name: 'partially_on_hold',
    label: 'Partially On Hold',
    color: 'blue',
    icon: 'icon-question-mark-line',
  },
  disputed: {
    name: 'disputed',
    label: 'Disputed',
    color: 'red',
    icon: 'icon-clock',
  },
  exceptions: {
    name: 'exceptions',
    label: 'Exceptions',
    color: 'blue',
    icon: 'icon-shopping-cart-add',
  },
  prior_period: {
    name: 'prior_period',
    label: 'Prior Period',
    color: 'blue',
    icon: 'icon-arrow-circle-left',
  },
  adjustment: {
    name: 'adjustment',
    label: 'Adjustment',
    color: 'blue',
    icon: 'icon-refresh',
  },
  premium_pay: {
    name: 'premium_pay',
    label: 'Premium Pay',
    color: 'blue',
    icon: 'icon-invoice',
  },
  rejected: {
    name: 'rejected',
    label: 'Rejected',
    color: 'warning',
    icon: 'icon-person-add-line',
  },
  pdf: {
    name: 'pdf',
    label: 'PDF',
    color: 'greyDark',
    icon: 'icon-file-pdf',
  },
  xls: {
    name: 'xls',
    label: 'XLS',
    color: 'greyDark',
    icon: 'icon-file-excel',
  },
  csv: {
    name: 'csv',
    label: 'CSV',
    color: 'greyDark',
    icon: 'icon-file-csv',
  },
  regularHours: {
    name: 'regularHours',
    label: 'Regular time',
    color: 'primary',
    icon: 'icon-clock-line',
  },
  premiumHours: {
    name: 'premiumHours',
    label: 'Premium time',
    color: 'blueDarkest',
    icon: 'icon-clock-plus',
  },
  money: {
    name: '$',
    label: '$',
    color: 'blueDarkest',
    icon: 'icon-money',
  },
  inactive: {
    name: 'inactive',
    label: 'Inactive',
    color: 'danger',
    icon: 'icon-close',
  },
  doNotReturn: {
    name: 'doNotReturn',
    label: 'Do Not Return',
    color: 'danger',
    icon: 'icon-close',
  },
};

export const avatarSizes = {
  xs: {
    width: 38,
    height: 38,
    ...fontSizes.xxs,
  },
  sm: {
    width: 48,
    height: 48,
    ...fontSizes.xs,
  },
  md: {
    width: 58,
    height: 58,
    ...fontSizes.lg,
  },
  lg: {
    width: 68,
    height: 68,
    fontSize: 28, // XL too large
  },
};

export const input = {
  checkbox: {
    '& .ui.checkbox label': {
      ...display.block,
      width: '100%',
      height: '20px',
      '&::before': {
        top: '0 !important',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      '&::after': {
        top: '2px !important',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
  pill: {
    display: 'inline-block',
    fontFamily: 'Avenir Next, Lato, Helvetica Neue,Arial,Helvetica,sans-serif',
    border: 'none',
    borderRadius: '100px',
    height: '30px',
    lineHeight: '30px',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 30px',
    '&:focus, &:active': {
      outline: 'none',
    },
  },
  default: {
    '& .cascade-input > .ui.dropdown.activeItem': {
      borderLeft: `solid 8px ${colors.primary} !important`,
    },
    '& input, & textarea, & input.DateInput_input': {
      ...padding.yXs,
      ...padding.xSm,
      ...fontSizes.sm,
      ...border.roundedSm,
      minHeight: '40px !important',
      lineHeight: '1.4 !important',
      border: `solid 1px ${colors.silver} !important`,
      resize: 'none !important',
      '&:focus, &:active': {
        outline: 'none',
      },
    },
    '& .ui.dropdown': {
      ...padding.yXxs,
      '& .icon': {
        ...padding.none,
        ...utils.h100,
        '&::before': {
          marginTop: '10px !important',
          ...margin.rightXs,
          ...display.block,
        },
      },
      '& .ui.label .icon::before': {
        position: 'absolute',
        top: '50%',
        right: spacing.xs,
        ...margin.none,
        transform: 'translateY(-50%)',
      },
      '&.loading .icon::before': {
        ...display.none,
      },
      '& .menu': {
        borderColor: `${colors.silver} !important`,
        '& .selected.item': {
          fontWeight: fontWeight.w500,
          backgroundColor: `${colors.greyLightest} !important`,
        },
      },
      '&.multiple': {
        ...padding.yNone,
        ...display.flex,
        ...flex.alignItemsCenter,
        flexWrap: 'wrap',
        '& input': {
          ...margin.none,
          ...padding.none,
          minHeight: `${spacing.s} !important`,
        },
        '& .text': {
          ...margin.leftNone,
        },
        '& .ui.label': {
          position: 'relative',
          ...padding.rightMd,
          ...fontSizes.xs,
        },
        '& .default.text': {
          position: 'absolute !important',
          ...padding.none,
          ...margin.none,
          left: spacing.s,
          top: '50% !important',
          transform: 'translateY(-50%) !important',
        },
      },
    },
  },
  error: {
    '& input, & .ui.dropdown, & textarea': {
      backgroundColor: `${colors.redLightest} !important`,
      borderColor: `${colors.redLight} !important`,
      color: `${colors.red} !important`,
      '&::-webkit-input-placeholder': {
        color: `${colors.red} !important`,
      },
      '&::-moz-placeholder': {
        color: `${colors.red} !important`,
      },
      '&:-ms-input-placeholder': {
        color: `${colors.red} !important`,
      },
      '&:-moz-placeholder': {
        color: `${colors.red} !important`,
      },
    },
  },
  disabled: {
    opacity: '0.45 !important',
    '& *': {
      opacity: '1 !important',
    },
  },
  lg: {
    height: '40px !important',
    lineHeight: '40px',
    ...fontSizes.sm,
  },
};

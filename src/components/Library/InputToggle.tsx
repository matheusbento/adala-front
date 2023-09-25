import { css } from 'glamor';
import { Checkbox } from 'semantic-ui-react';

import { colors, fontSizes } from '../../utils/theme';

function InputToggle({
  input,
  label,
  labelSize,
  labelColor,
  reverse,
  smallBox,
  disabled,
  className,
  ...rest
}: any) {
  const styleProps = css({
    '&.ui.checkbox > label': {
      ...fontSizes[labelSize],
      color: labelColor,
      paddingTop: 4,
    },
    '&.ui.toggle.checkbox input:checked ~ label:before': {
      backgroundColor: `${colors.primary} !important`,
      borderColor: `${colors.primary} !important`,
    },
  });

  const styleForm = css(labelSize && styleProps);

  return (
    <Checkbox
      toggle
      onChange={(_, { checked }) => input.onChange(checked)}
      checked={!!input.value}
      label={label}
      className={`${styleForm} ${className}`}
      disabled={disabled}
      {...rest}
    />
  );
}

export default InputToggle;

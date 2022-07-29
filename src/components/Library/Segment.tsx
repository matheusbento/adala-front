import { css } from 'glamor';

import { colors, spacing, padding } from '../../utils/theme';

const Segment = ({
  children,
  borders = false,
  box = false,
  shadow = false,
  borderRadius = null,
  marginBottom = null,
  boxPadding = null,
  ...props
}: any) => {
  const styleBox = box
    ? css({
        backgroundColor: colors.greyLightest,
        borderRadius: spacing.m,
        ...padding.sm,
        ...padding.mdLg,
      })
    : css();

  const stylePadding = boxPadding ? css(boxPadding) : css();

  const styleBorders = borders
    ? css({
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        padding: `${spacing.m} 0`,
      })
    : css();

  const styleShadow = shadow
    ? css({
        backgroundColor: colors.negative,
        boxShadow: '0 1px 3px #ccc !important',
      })
    : css();

  const styleBorderRadius = borderRadius
    ? css({
        borderRadius: spacing[borderRadius],
      })
    : css();

  const styleMarginBottom = marginBottom
    ? css({
        marginBottom: spacing[marginBottom],
      })
    : css();

  const childProps = { ...props };
  delete childProps.box;

  return (
    <div
      className={`${styleBox} ${styleBorders} ${styleShadow} ${styleBorderRadius} ${styleMarginBottom} ${stylePadding}`}
      {...childProps}
    >
      {children}
    </div>
  );
};

export default Segment;

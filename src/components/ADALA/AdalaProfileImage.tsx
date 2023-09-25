import { useMemo } from 'react';

import { hexFromEmail, contrastColor } from '@helpers/index';
import { css } from 'glamor';

import { margin, display, flex, text, avatarSizes, fontWeight } from 'utils/theme';

import Segment from '../Library/Segment';

const styleSegment = css(display.flex);

function AdalaProfileImage({ user, borderColor, size, className, onClick }: any) {
  const { email, first_name: firstName, last_name: lastName, profile_image: image } = user;
  const bgColor = hexFromEmail(email);
  const textColor = contrastColor(bgColor);

  const styleBackground = useMemo(
    () =>
      image
        ? {
            backgroundImage: `url(${image.s64 || image.full})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }
        : {
            backgroundColor: `#${bgColor}`,
          },
    [bgColor, image],
  );

  const styleBadge = useMemo(
    () =>
      css(
        display.flex,
        flex.alignItemsCenter,
        flex.justifyContentCenter,
        margin.rightSm,
        styleBackground,
        text.uppercase,
        onClick && { cursor: 'pointer' },
        {
          ...(!!borderColor && { border: `2px solid ${borderColor}` }),
          ...avatarSizes?.[size],
          borderRadius: '50%',
          color: textColor,
          fontWeight: fontWeight.w500,
        },
      ),
    [onClick, size, styleBackground, textColor, borderColor],
  );

  return (
    <Segment className={`${styleSegment} ${className}`} onClick={onClick}>
      <div className={`${styleBadge}`}>
        {!image && !!firstName && `${firstName[0]}${lastName[0]}`}
      </div>
    </Segment>
  );
}

export default AdalaProfileImage;

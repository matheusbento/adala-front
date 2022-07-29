/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, useMemo } from 'react';

import Button from '@components/Library/Button';
import BaslakeSegmet from '@components/Library/Segment';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { colors, margin, buttons, display } from '@utils/theme';
import { css } from 'glamor';
import { When } from 'react-if';

const styleSidebarToggle = css(buttons.plain);

const styleSidebarText = css(margin.leftXs, margin.rightMd);

const styleSegment = css(display.block);

const styleIconActive = css(margin.leftXs);

const BaslakePageTitle = (props: {
  clickIconHandler?: any;
  clickIconActive?: boolean;
  visible: boolean;
  children: ReactNode;
  icon: string;
  subtitle?: string;
}) => {
  const {
    clickIconActive = false,
    visible,
    children,
    icon,
    clickIconHandler = null,
    subtitle = null,
  } = props;

  const clickIconColor = useMemo(() => {
    if (!visible) {
      return clickIconActive ? colors.blue : colors.default;
    }
    return clickIconActive ? colors.blueLight : colors.grey;
  }, [clickIconActive, visible]);

  return (
    <>
      <When condition={icon}>
        {() => (
          <Button
            onClick={clickIconHandler}
            className={`${styleSidebarToggle}`}
          >
            <SvgIcon
              path={icon}
              size="md"
              color={visible ? colors.default : colors.grey}
            />
            <When condition={clickIconActive && !visible}>
              <SvgIcon
                path="icon-filter"
                size="sm"
                color={clickIconColor}
                className={`${styleIconActive}`}
              />
            </When>
          </Button>
        )}
      </When>
      <BaslakeSegmet className={`${styleSegment}`}>
        <Text
          size="lg"
          weight="medium"
          color="default"
          className={`${styleSidebarText}`}
        >
          {children}
        </Text>
        <When condition={subtitle}>
          {() => (
            <Text
              size="sm"
              weight="medium"
              color="primary"
              className={`${styleSegment}`}
            >
              {subtitle}
            </Text>
          )}
        </When>
      </BaslakeSegmet>
    </>
  );
};

export default BaslakePageTitle;

import { ReactNode } from 'react';

import CloseModalIcon from '@components/Library/CloseModalIcon';
import Text from '@components/Library/Text';
import { css } from 'glamor';
import { If, Then, Else, When } from 'react-if';
import { Link, To } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import { margin, padding, display, flex, colors } from 'utils/theme';

const styleSegment = css(
  display.flex,
  flex.alignItemsCenter,
  padding.xMd,
  padding.topMd,
  padding.bottomNone,
  margin.bottomNone,
  flex.justifyContentBetween,
);

const styleHeader = css(margin.none);

const styleHeaderLink = css({
  '&:hover': {
    color: `${colors.primary} !important`,
    textDecoration: 'underline',
  },
});

interface BaslakeModalHeaderProps {
  headerChildren?: ReactNode;
  title?: string;
  closeHandler?: any;
  isClosable?: boolean;
  linkTo?: To;
}

function BaslakeHeader({
  title = '',
  closeHandler = undefined,
  isClosable = true,
  headerChildren = null,
  linkTo = undefined,
}: BaslakeModalHeaderProps) {
  return (
    <Segment basic className={`${!headerChildren ? styleSegment : ''}`}>
      <If condition={!!headerChildren}>
        <Then>{headerChildren}</Then>
        <Else>
          {() => (
            <>
              <If condition={!!linkTo}>
                <Then>
                  {() => (
                    <Link to={linkTo ?? ''} onClick={closeHandler}>
                      <Text
                        size="md"
                        weight="medium"
                        className={`${styleHeader} ${styleHeaderLink}`}
                      >
                        {title}
                      </Text>
                    </Link>
                  )}
                </Then>
                <Else>
                  {() => (
                    <Text size="md" weight="medium" className={`${styleHeader}`}>
                      {title}
                    </Text>
                  )}
                </Else>
              </If>

              <When condition={isClosable}>{() => <CloseModalIcon onClick={closeHandler} />}</When>
            </>
          )}
        </Else>
      </If>
    </Segment>
  );
}

export default BaslakeHeader;

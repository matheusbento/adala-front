import { css } from 'glamor';
import { When } from 'react-if';

import { display, flex } from '../../utils/theme';
import Header from '../Library/Header';
import Segment from '../Library/Segment';
import AdalaProfileImage from './AdalaProfileImage';

const styleFlexStart = css(display.flex, flex.alignItemsCenter);

function AdalaProfileUser(props: any) {
  const { user, subtitle, imageOnly } = props;

  return (
    <Segment basic="true" className={`${styleFlexStart}`}>
      <AdalaProfileImage {...props} />
      <When condition={!imageOnly}>
        {() => (
          <Segment>
            <Header as="p" weight="400">
              {`${user.first_name} ${user.last_name}`}

              <When condition={subtitle}>
                {() => (
                  <>
                    <br />
                    {subtitle}
                  </>
                )}
              </When>
            </Header>
          </Segment>
        )}
      </When>
    </Segment>
  );
}

export default AdalaProfileUser;

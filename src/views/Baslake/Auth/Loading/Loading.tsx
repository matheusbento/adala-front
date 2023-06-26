/* eslint-disable import/no-extraneous-dependencies */
import { css } from 'glamor';
import { Loader } from 'semantic-ui-react';

import { display, flex, utils } from '../../../../utils/theme';

const styleContainer = css(
  display.flex,
  flex.justifyContentCenter,
  flex.alignItemsCenter,
  utils.mvh100,
);

function Loading() {
  return (
    <div className={`${styleContainer}`}>
      <Loader active inline="centered" />
    </div>
  );
}

export default Loading;

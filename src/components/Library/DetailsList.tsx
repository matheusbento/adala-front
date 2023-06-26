import { ReactNode } from 'react';

import { css } from 'glamor';
import { Grid, SemanticWIDTHS } from 'semantic-ui-react';

import { fontSizes, fontWeight, colors, padding } from '../../utils/theme';

const styleContainer = css(fontSizes.xs);

const styleColumn = css(padding.yXxs);

const styleTitle = css({
  fontWeight: fontWeight.w400,
  color: colors.greyDarkest,
});

const styleDescription = css({
  fontWeight: fontWeight.w600,
});

function DetailsList({
  title = '',
  description = '',
  columnsWidths = [8, 8],
}: {
  title?: string;
  description?: string | number | ReactNode;
  columnsWidths?: SemanticWIDTHS[];
}) {
  return (
    <Grid className={`${styleContainer}`}>
      <Grid.Column width={columnsWidths[0]} className={`${styleTitle} ${styleColumn}`}>
        {title}
      </Grid.Column>
      <Grid.Column width={columnsWidths[1]} className={`${styleDescription} ${styleColumn}`}>
        {description}
      </Grid.Column>
    </Grid>
  );
}

export default DetailsList;

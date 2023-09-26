import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import Button from '@components/Library/Button';
import Segment from '@components/Library/Segment';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

function CubeDashboardItemDownload({ open, title, closeHandler }: any) {
  const { t } = useTranslation();
  return (
    <BaslakeModal
      title={t(`Download Data from ${title}`)}
      closeHandler={closeHandler}
      open={open}
      className={`${css(margin.topXl)}`}
      centered
    >
      <BaslakeModal.Content>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Button
                  outline
                  color="primary"
                  fluid
                  pill
                  loading={false}
                  onClick={() => {}}
                  type="button"
                >
                  .FITS
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button
                  outline
                  color="primary"
                  fluid
                  pill
                  loading={false}
                  onClick={() => {}}
                  type="button"
                >
                  .JSON
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </BaslakeModal.Content>
    </BaslakeModal>
  );
}

export default CubeDashboardItemDownload;

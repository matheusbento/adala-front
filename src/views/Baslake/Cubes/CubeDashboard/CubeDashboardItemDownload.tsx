import { useCallback, useEffect, useMemo, useState } from 'react';
import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import Button from '@components/Library/Button';
import Segment from '@components/Library/Segment';
import Text from '@components/Library/Text';
import Config from '@helpers/config';
import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import { useOrganization } from '@hooks/Organization';
import { margin, padding } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Grid } from 'semantic-ui-react';
import { getSession } from '@/helpers';

function CubeDashboardItemDownload({ itemId, open, title, closeHandler }: any) {
  const [type, setType] = useState<string | null>(null);
  const [auth, setAuth] = useState<any>(null);
  const { currentOrganization } = useOrganization();
  const { cube } = useCubes();
  const { dashboardItems } = useDashboard();
  const { t } = useTranslation();

  const item = useMemo(
    () => dashboardItems?.find((e: any) => e.id === +itemId),
    [dashboardItems, itemId],
  );

  const filter = useMemo(() => JSON.stringify(item.filter), [item.filter]);

  const params = new URLSearchParams(
    filter
      ? {
          ...item,
          filter,
        }
      : item,
  ).toString();

  const getAuth = useCallback(async () => {
    const headers = await getSession();
    setAuth(headers);
  }, []);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

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
                  onClick={() => {
                    setType('fits');
                  }}
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
                  onClick={() => {
                    setType('api');
                  }}
                  type="button"
                >
                  {t('API Integration')}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <When condition={type === 'api'}>
            <Segment className={`${css(padding.sm, margin.topSm, { border: '1px solid #ccc' })}`}>
              <Text className={`${css(margin.topSm, margin.bottomSm)}`}>{t('Endpoint')}</Text>
              <Segment box>
                <pre style={{ overflowX: 'auto' }}>
                  {JSON.stringify(
                    {
                      method: 'GET',
                      endpoint: `${Config.SERVER_URL}/organizations/${currentOrganization?.id}/cubes/${cube?.id}/data`,
                      params,
                    },
                    null,
                    2,
                  )}
                </pre>
              </Segment>
              <Text className={`${css(margin.topSm, margin.bottomSm)}`}>{t('Authorization')}</Text>
              <Segment box>
                <pre style={{ overflowX: 'auto' }}>{JSON.stringify(auth, null, 2)}</pre>
              </Segment>
            </Segment>
          </When>
        </Segment>
      </BaslakeModal.Content>
    </BaslakeModal>
  );
}

export default CubeDashboardItemDownload;

import { useCallback, useMemo, useState } from 'react';

import Button from '@components/Library/Button';
import DetailsList from '@components/Library/DetailsList';
import Header from '@components/Library/Header';
import { useWindowWidth } from '@helpers/index';
import { useCubes } from '@hooks/Cubes';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { List, Divider, Grid, Loader } from 'semantic-ui-react';

import '@translations/i18n';
import { useAuth } from 'hooks/Auth';

import { CubeMetadataType } from 'types/CubeMetadataType';

import { beautifyJson } from 'utils/formatting';
import { fontWeight, spacing, margin, colors } from 'utils/themeConstants';

import { When } from 'react-if';

import { statuses } from '@constants/cubesConstants';
import CubeDashboardModalContainer from './CubeDashboard/CubeDashboardModalContainer';
import CubesDetailsHeader from './CubesDetailsHeader';

const styleNote = css({
  fontWeight: fontWeight.w500,
  whiteSpace: 'pre-line',
});

const styleButton = css(margin.rightXs, {
  fontWeight: fontWeight.w500,
  backgroundColor: colors.primary,
});

const styleSubHeaders = css({
  '&.ui.header': {
    ...margin.bottomSm,
    fontWeight: fontWeight.w600,
  },
});

const marginBlueHeaders = `${spacing.s} 0 ${spacing.m}`;

const styleDetailColumn = css({
  ...margin.bottomLg,
  '& > .ui.grid + .ui.grid': {
    ...margin.topXxs,
  },
});

function CubesDetails() {
  const { session } = useAuth();

  const { isLoadingCube, isUpdating, cube, cubeModel, setShowModal, setInitialValues } = useCubes();

  const [showDashboard, setShowDashboard] = useState(false);

  const windowSize = useWindowWidth();

  const { t } = useTranslation();

  // const handleEditJobOrder = useCallback(
  //   (entity) => {
  //     editJobOrderModalHandler(entity, notes, jobTitlesGroupsOptions);
  //   },
  //   [editJobOrderModalHandler, notes, jobTitlesGroupsOptions]
  // );

  const cubeInfos = useMemo(() => cube?.metadata ?? [], [cube]);

  const cubeMappings = useMemo(
    () => (cubeModel?.mappings ? Object.keys(cubeModel?.mappings) : []),
    [cubeModel],
  );

  const handleEditCube = useCallback(() => {
    setShowModal('edit');
    setInitialValues({
      ...cube,
      start_date: cube?.metadata?.find((e: CubeMetadataType) => e.field === 'start_date').value,
      end_date: cube?.metadata?.find((e: CubeMetadataType) => e.field === 'end_date').value,
      model: beautifyJson(JSON.stringify(cube.model)),
      metadata: cube?.metadata?.filter(
        (e: CubeMetadataType) => !['start_date', 'end_date'].includes(e.field),
      ),
    });
  }, [cube, setInitialValues, setShowModal]);

  const handleDataVisualize = useCallback(() => {
    setShowDashboard(true);
  }, [setShowDashboard]);

  return (
    <>
      {(isLoadingCube || isUpdating) && <Loader active>Loading cube</Loader>}
      {!isLoadingCube && (
        <List>
          {/* <When condition={cubeModel?.actionErrors}>
            {() => (
              <FormMessage
                error
                header="Error"
                list={[cubeModel?.actionErrors]}
                visible={!!cubeModel?.actionErrors}
              />
            )}
          </When> */}

          <CubesDetailsHeader cube={cube} />

          <List.Item>
            <When condition={cube?.current_status === statuses.ready_to_analysis}>
              <Button
                pill
                className={`${styleButton}`}
                size="xs"
                onClick={handleDataVisualize}
                color="primary"
                outline
              >
                {t('Data visualize')}
              </Button>
            </When>
            <Button
              pill
              className={`${styleButton}`}
              size="xs"
              onClick={() => handleEditCube()}
              color="primary"
              outline
            >
              {t('Edit')}
            </Button>
          </List.Item>

          <Divider />

          <Header as="h4" className={`${styleSubHeaders}`}>
            {t('Cube Details')}
          </Header>
          <Grid>
            <Grid.Row columns={windowSize >= 1200 ? 2 : 1}>
              <When condition={cubeModel?.details.length}>
                <Grid.Column className={`${styleDetailColumn}`}>
                  <Header as="p" color="primary" line lineMargin={`${marginBlueHeaders}`}>
                    {t('Details')}
                  </Header>
                  {cubeModel?.details.map((detail: any) => (
                    <DetailsList
                      key={`mapping-${detail.label}`}
                      title="Name"
                      description={detail?.label}
                    />
                  ))}
                </Grid.Column>
              </When>
              <Grid.Column className={`${styleDetailColumn}`}>
                <Header as="p" color="primary" line lineMargin={`${marginBlueHeaders}`}>
                  {t('Infos')}
                </Header>
                {cubeInfos.map((val: CubeMetadataType) => (
                  <DetailsList key={`info-${val.id}`} title={val.field} description={val.value} />
                ))}
              </Grid.Column>
              {/* <Grid.Column className={`${styleDetailColumn}`}>
                <Header as="p" color="primary" line lineMargin={`${marginBlueHeaders}`}>
                  {t('Dimensions')}
                </Header>
                {cubeModel?.dimensions.map((dim: DimensionType) => (
                  <>
                    <DetailsList
                      key={`${dim?.name}-name`}
                      title={t('Name')}
                      description={dim?.name}
                    />
                    <DetailsList
                      key={`${dim?.name}-details`}
                      title={t('Has details')}
                      description={dim?.has_details ? t('True') : t('False')}
                    />
                    <DetailsList
                      key={`${dim?.name}-flat`}
                      title={t('Is flat')}
                      description={dim?.is_flat ? t('True') : t('False')}
                    />
                    <DetailsList
                      key={`${dim?.name}-lvl`}
                      title={t('Hierarchies')}
                      description={
                        <TextEllipsis count={dim.hierarchies?.length}>
                          {flatten(dim.hierarchies?.map((e: any) => e.levels)).join(', ')}
                        </TextEllipsis>
                      }
                    />
                    <Divider />
                  </>
                ))}
              </Grid.Column> */}
              {/* <Grid.Column className={`${styleDetailColumn}`}>
                <Header as="p" color="primary" line lineMargin={`${marginBlueHeaders}`}>
                  {t('Aggregations')}
                </Header>
                {cubeModel?.aggregates.map((agg: any) => (
                  <>
                    <DetailsList
                      key={`${agg?.label}-label`}
                      title={t('Label')}
                      description={agg?.label}
                    />
                    <DetailsList
                      key={`${agg?.name}-field`}
                      title={t('Field Name')}
                      description={agg?.name}
                    />
                    <Divider />
                  </>
                ))}
              </Grid.Column> */}
              {/* <Grid.Column className={`${styleDetailColumn}`}>
                <Header as="p" color="primary" line lineMargin={`${marginBlueHeaders}`}>
                  {t('Mappings')}
                </Header>
                {cubeMappings.map((key: string) => (
                  <DetailsList
                    key={`mapping-${key}`}
                    title={key}
                    description={cubeModel?.mappings[key]}
                  />
                ))}
              </Grid.Column> */}
              {/* <Grid.Column className={`${styleDetailColumn}`}>
                <Header
                  as="p"
                  color="primary"
                  line
                  lineMargin={`${marginBlueHeaders}`}
                >
                  Profession / Job
                </Header>
                <DetailsList title="Location" description="LOcation" />
                <DetailsList title="Department" description="Department" />

                <DetailsList title="Title" description="Title" />
              </Grid.Column>
              <Grid.Column className={`${styleDetailColumn}`}>
                <Header
                  as="p"
                  color="primary"
                  line
                  lineMargin={`${marginBlueHeaders}`}
                >
                  Job Features
                </Header>
                <>
                  <DetailsList title="Shift" description="Shift" />
                  <DetailsList
                    title="Shift Length"
                    description="Shift Length"
                  />
                </>
                <DetailsList title="Priority" description="Priority" />
              </Grid.Column>
              <Grid.Column className={`${styleDetailColumn}`}>
                <Header
                  as="p"
                  color="primary"
                  line
                  lineMargin={`${marginBlueHeaders}`}
                >
                  Requirements
                </Header>
                <DetailsList title="License" description="Todas License" />
                <DetailsList title="Certifications" description="Todas Certs" />
              </Grid.Column>
              <Grid.Column className={`${styleDetailColumn}`}>
                <Header
                  as="p"
                  color="primary"
                  line
                  lineMargin={`${marginBlueHeaders}`}
                >
                  Budget
                </Header>
                <DetailsList title="Base Rate" description="Base Rate" />
                <DetailsList title="Estimate" description="Estimate" />
                <DetailsList title="Bonus" description="Bonus" />
              </Grid.Column> */}
            </Grid.Row>
          </Grid>

          {/* <Header as="h4" className={`${styleSubHeaders}`}>
            Cubes Description
          </Header>
          <p>[description]</p>

          <Header as="h4" className={`${styleSubHeaders}`}>
            Notes
          </Header>
          <Table basic="very" className={`${styleTable}`}>
            <Table.Body>
              {[
                {
                  id: 123,
                  is_internal: true,
                  user: {
                    first_name: 123,
                    last_name: 123,
                  },
                  created_at: moment(),
                  text: 'TODOOO',
                },
              ].map((note) => (
                <Table.Row key={note.id}>
                  <Table.Cell>
                    <div className={`${styleName}`}>
                      {note.is_internal ? (
                        <Icon
                          circular
                          inverted
                          className={`${styleLockIcon}`}
                          size="small"
                          name="lock"
                        />
                      ) : (
                        <Icon
                          circular
                          inverted
                          className={`${styleUnlockIcon}`}
                          size="small"
                          name="unlock"
                        />
                      )}
                      {note.user &&
                        `${note.user.first_name} ${note.user.last_name}`}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className={`${styleName}`}>
                      {note.created_at && moment(note.created_at).format('ll')}
                    </div>
                  </Table.Cell>
                  <Table.Cell className={`${styleNote}`}>
                    {note.text}
                  </Table.Cell>
                  <Table.Cell>
                    <When condition>
                      {() => (
                        <Button
                          icon
                          circular
                          basic
                          size="mini"
                          onClick={() => console.log(note)}
                        >
                          <Icon name="trash alternate outline" />
                        </Button>
                      )}
                    </When>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Header as="h4" className={`${styleSubHeaders}`}>
            History
          </Header> */}

          {/* <div className={`${styleHistory}`}>
            All Histories aqui */}
          {/* <JobOrderHistoryContainer cubeId={showCube?.id} /> */}
          {/* </div> */}

          {/* <CubesNotesModalContainer cube={showCube} /> */}
        </List>
      )}

      {/* <ModalConfirm
        open={!!deletingNote}
        header="Delete Note"
        confirmText="Are you sure you want to delete this note?"
        labelConfirm="Delete"
        onConfirm={handleConfirmDeleteNote}
        onDismiss={() => setDeletingNote(null)}
      /> */}
      <CubeDashboardModalContainer showModal={showDashboard} setShowModal={setShowDashboard} />
    </>
  );
}
export default CubesDetails;

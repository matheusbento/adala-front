import { useCallback, useMemo, useState } from 'react';

import Button from '@components/Library/Button';
import DetailsList from '@components/Library/DetailsList';
import Header from '@components/Library/Header';
import { useWindowWidth } from '@helpers/index';
import { useCubes } from '@hooks/Cubes';
import { css } from 'glamor';
import moment from 'moment';
import { If, Then, Else, When } from 'react-if';
import { useDispatch } from 'react-redux';
import { List, Divider, Grid, Table, Icon, Loader } from 'semantic-ui-react';

import { useAuth } from 'hooks/Auth';

import { formatMoney } from 'utils/formatting';
import {
  fontWeight,
  spacing,
  margin,
  padding,
  colors,
  text,
} from 'utils/themeConstants';

import CubesDetailsHeader from './CubesDetailsHeader';

const styleNote = css({
  fontWeight: fontWeight.w500,
  whiteSpace: 'pre-line',
});

const styleButton = css(margin.rightXs, {
  fontWeight: fontWeight.w500,
  backgroundColor: colors.primary,
});

const styleHistory = css(padding.bottomMd);

const styleTable = css({
  ' i': {
    ...margin.rightXs,
  },
});

const styleLockIcon = css({
  '&.inverted.circular.lock.icon': {
    color: colors.greyIcon,
  },
});

const styleUnlockIcon = css({
  '&.inverted.circular.lock.icon': {
    color: colors.green,
  },
});

const styleName = css({
  minWidth: 150,
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

const CubesDetails = () => {
  const { session } = useAuth();

  const { isLoadingCube, isUpdating, cube, setIsOpenCubeViewerModal } =
    useCubes();

  const windowSize = useWindowWidth();

  // const handleEditJobOrder = useCallback(
  //   (entity) => {
  //     editJobOrderModalHandler(entity, notes, jobTitlesGroupsOptions);
  //   },
  //   [editJobOrderModalHandler, notes, jobTitlesGroupsOptions]
  // );

  return (
    <>
      {(isLoadingCube || isUpdating) && <Loader active>Loading cube</Loader>}
      {!isLoadingCube && (
        <List>
          {/* <When condition={cube.actionErrors}>
            {() => (
              <FormMessage
                error
                header="Error"
                list={[cube.actionErrors]}
                visible={!!cube.actionErrors}
              />
            )}
          </When> */}

          <CubesDetailsHeader cube={cube} />

          <List.Item>
            <Button
              pill
              className={`${styleButton}`}
              size="xs"
              onClick={() => setIsOpenCubeViewerModal(true)}
              color="primary"
              outline
            >
              View
            </Button>
          </List.Item>

          <Divider />

          <Header as="h4" className={`${styleSubHeaders}`}>
            Cube Details
          </Header>
          <Grid>
            <Grid.Row columns={windowSize >= 1200 ? 2 : 1}>
              <Grid.Column className={`${styleDetailColumn}`}>
                <Header
                  as="p"
                  color="primary"
                  line
                  lineMargin={`${marginBlueHeaders}`}
                >
                  Cube Type
                </Header>
                <DetailsList title="Type" description="Description" />
              </Grid.Column>
              <Grid.Column className={`${styleDetailColumn}`}>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Header as="h4" className={`${styleSubHeaders}`}>
            Order Description
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
          </Header>

          <div className={`${styleHistory}`}>
            All Histories aqui
            {/* <JobOrderHistoryContainer cubeId={showCube?.id} /> */}
          </div>

          {/* <CubesNotesModalContainer order={showCube} /> */}
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
    </>
  );
};
export default CubesDetails;

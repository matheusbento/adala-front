/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState, useMemo, useEffect } from 'react';

import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import ContentGroup from '@components/Library/ContentGroup';
import Text from '@components/Library/Text';
import { useCubes } from '@hooks/Cubes';
import { padding } from '@utils/theme';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { Else, If, Then, When } from 'react-if';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';

import { DimensionType } from 'types/DimensionType';
import { LevelType } from 'types/LevelType';
import ButtonLibrary from '@components/Library/Button';

const CubeViewerModal = () => {
  const [params, setParams] = useState<Record<string, any>>({});
  const [dimension, setDimension] = useState<string | undefined>(undefined);
  const location = useLocation();

  const {
    cube,
    cubeView,
    isOpenCubeViewerModal,
    isLoadingCubeView,
    fetchCubeViewerHandler,
    setIsOpenCubeViewerModal,
  } = useCubes();

  // const { canOpenEditing } = useJobOrderPolicy();

  const handleCloseModal = useCallback(() => {
    setIsOpenCubeViewerModal(false);
  }, [location.search]);

  const modalTitle = useMemo(() => `Viewer Cube ${cube?.label}`, [cube]);

  useEffect(() => {
    setParams({});
  }, []);

  useEffect(() => {
    fetchCubeViewerHandler(dimension, params);
  }, [dimension, params]);

  const nextLevel = useMemo(() => cubeView?.next_level?.level, [cubeView]);

  const baseLevel = useMemo(
    () =>
      dimension
        ? [
            {
              key: `${dimension}-${nextLevel?.key}`,
              label: 'All',
              name: 'All',
              link: false,
            },
          ]
        : [{}],
    [dimension]
  );

  const sections = useMemo(() => {
    const end = nextLevel
      ? [
          {
            key: `${nextLevel?.key}-${params?.cut}`,
            label: nextLevel?.label ?? nextLevel?.name,
            name: nextLevel?.name,
            link: false,
          },
        ]
      : [];
    const levels = [
      ...baseLevel,
      ...(cubeView?.levels?.map((e: LevelType) => ({ ...e, link: true })) ??
        []),
      ...end,
    ];
    return levels?.map((level: LevelType, index: number) => ({
      key: index,
      content: level.label,
      link: level?.link,
      onClick: level?.link
        ? () => {
            setParams((prev) => ({
              ...prev,
              cut: levels[index - 1]?.cut,
            }));
          }
        : null,
    }));
  }, [dimension, nextLevel, cubeView]);

  const headers = useMemo(
    () => [
      {
        label: nextLevel?.label ?? nextLevel?.name,
        key: 'next_level',
        sortable: false,
      },
      { label: 'Count', key: 'count', sortable: false },
      { label: 'Amount', key: 'amount', sortable: false },
    ],
    [cubeView, baseLevel, nextLevel]
  );

  const rows = useMemo(
    () =>
      cubeView?.result?.map((row: any) => [
        cubeView?.is_last ? (
          row.label
        ) : (
          <ButtonLibrary
            link
            onClick={() => {
              setParams((prev) => ({
                ...prev,
                cut: row.cut,
              }));
            }}
          >
            {row.label}
          </ButtonLibrary>
        ),
        row.record.record_count,
        row.record.amount_sum,
      ]),
    [cubeView]
  );

  return (
    <BaslakeModal
      title={modalTitle}
      closeHandler={handleCloseModal}
      open={isOpenCubeViewerModal}
      size="large"
    >
      <BaslakeModal.Content>
        <If condition={!cube || !cubeView}>
          <Then>
            <Loader inline="centered" />
          </Then>
        </If>
        <Else>
          {() => (
            <Dimmer.Dimmable as={Segment} blurring dimmed={isLoadingCubeView}>
              <Dimmer active={isLoadingCubeView}>
                <Loader inline="centered" />
              </Dimmer>
              <Segment>
                <ContentGroup caption="Dimensions">
                  <Button.Group className={`${css(padding.topXs)}`}>
                    {cubeView?.dimensions?.map((dim: DimensionType) => (
                      <>
                        <Button
                          positive={dimension === dim.name}
                          onClick={() => {
                            setDimension(dim.name);
                            setParams({});
                          }}
                        >
                          {dim.label ?? dim.name}
                        </Button>
                        <Button.Or />
                      </>
                    ))}
                    <Button onClick={() => setDimension(undefined)}>
                      Clear
                    </Button>
                  </Button.Group>
                </ContentGroup>
              </Segment>
              <When condition={dimension && cubeView?.levels}>
                <Segment>
                  <ContentGroup caption="Path">
                    <Breadcrumb
                      icon="right angle"
                      sections={sections}
                      className={`${css(padding.topXs)}`}
                    />
                  </ContentGroup>
                </Segment>
              </When>
              <When condition={dimension && cubeView?.levels}>
                <Segment>
                  <ContentGroup caption="Values">
                    <BaslakeTable
                      className={`${css(padding.topXs)}`}
                      headers={headers}
                      rows={rows}
                      alignNested="left"
                      highlightNested
                      highlightParentRow
                      condensed
                    />
                  </ContentGroup>
                </Segment>
              </When>
            </Dimmer.Dimmable>
          )}
        </Else>
      </BaslakeModal.Content>
    </BaslakeModal>
  );
};

export default CubeViewerModal;

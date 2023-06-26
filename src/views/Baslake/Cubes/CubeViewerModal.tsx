/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState, useMemo, useEffect } from 'react';

import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import ButtonLibrary from '@components/Library/Button';
import ContentGroup from '@components/Library/ContentGroup';
import { useCubes } from '@hooks/Cubes';
import { padding } from '@utils/theme';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { first } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Else, If, Then, When } from 'react-if';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';

import { DimensionType } from 'types/DimensionType';
import { LevelType } from 'types/LevelType';

import { arrayUnique } from '../../../helpers';

function CubeViewerModal() {
  const [params, setParams] = useState<Record<string, any>>({});
  const [dimension, setDimension] = useState<string | undefined>(undefined);
  const location = useLocation();
  const { t } = useTranslation();

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

  const modalTitle = useMemo(() => t(`Viewing Cube {{cube.name}}`, { cube }), [cube]);

  useEffect(() => {
    setParams({});
  }, []);

  useEffect(() => {
    fetchCubeViewerHandler();
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
              label: t('All'),
              name: t('All'),
              link: false,
            },
          ]
        : [{}],
    [dimension],
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
      ...(cubeView?.levels?.map((e: LevelType) => ({ ...e, link: true })) ?? []),
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

  const additionalHeader = useMemo(() => {
    const firstRow = first(cubeView?.result) as any;
    const record = firstRow?.record;

    const keys = record ? (Object.keys(record) as string[]) : [];

    if (keys?.length === 0) {
      return [];
    }
    // eslint-disable-next-line no-console
    console.log({ firstRow, record, keys });
    const prefixes = dimension?.split(':') as string[];
    // eslint-disable-next-line no-console
    console.log({ firstRow, record, prefixes, keys });
    const addHeaders = keys
      .filter((e: string) => (first(prefixes) ? !e.includes(first(prefixes) as string) : true))
      .map((e) => ({
        label: e,
        key: e,
        sortable: false,
      }));
    return addHeaders;
  }, [cubeView?.result]);

  const prettifyLabel = (label: string) =>
    Array.isArray(label) ? arrayUnique(label).join(', ') : label;

  // eslint-disable-next-line no-console
  console.log({ additionalHeader });

  const headers = useMemo(
    () => [
      {
        label: nextLevel?.label ?? nextLevel?.name,
        key: 'next_level',
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      ...additionalHeader,
    ],
    [cubeView, baseLevel, nextLevel],
  );

  const rows = useMemo(
    () =>
      cubeView?.result?.map((row: any) => [
        cubeView?.is_last ? (
          prettifyLabel(row.label)
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
            {prettifyLabel(row.label)}
          </ButtonLibrary>
        ),
        ...(additionalHeader?.map((e) => row.record[e.key]) ?? []),
      ]),
    [cubeView],
  );

  // eslint-disable-next-line no-console
  console.log({ headers, rows });

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
                <ContentGroup caption={t('Dimensions')}>
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
                    <Button onClick={() => setDimension(undefined)}>Clear</Button>
                  </Button.Group>
                </ContentGroup>
              </Segment>
              <When condition={dimension && cubeView?.levels}>
                <Segment>
                  <ContentGroup caption={t('Path')}>
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
                  <ContentGroup caption={t('Values')}>
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
}

export default CubeViewerModal;

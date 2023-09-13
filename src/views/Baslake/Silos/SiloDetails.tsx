import { useCallback, useMemo, useState } from 'react';

import { useSilo } from '@hooks/Silos';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Else, If, Then, When } from 'react-if';
import { Loader } from 'semantic-ui-react';

import FileIcon from 'components/Library/FileIcon';
import TextEllipsis from 'components/Library/TextEllipsis';

import { parseFileSize } from 'helpers/index';

import '@translations/i18n';
import { useAuth } from 'hooks/Auth';

import FileType from 'types/FileType';
import SiloFileAttributeType, { SiloFileInnerAttributeType } from 'types/SiloFileAttributeType';
import { SiloFileType } from 'types/SiloFileType';

import { buttons, display } from 'utils/theme';

import BaslakeTable from 'views/Layout/BaslakeTable';

import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import Text from '@components/Library/Text';
import { filterAttributes } from '@constants/cubesConstants';
import { fileStatus, statusColor, statusLabel } from '@constants/silosConstants';

import ContentGroup from '../../../components/Library/ContentGroup';
import { statusIcon } from '../../../constants/silosConstants';
import { colors, fontWeight, margin, padding } from '../../../utils/themeConstants';

const styleButton = css(buttons.plain, { verticalAlign: '-4px' });

const styleFiles = css(margin.topMd, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

function SiloDetails() {
  const { session } = useAuth();

  const {
    isLoadingSilo,
    isUpdating,
    setShowModalFile,
    files,
    downloadSiloFile,
    showSilo,
    fetchSiloFileAttributesHandler,
    isLoadingSiloFileAttributes,
    siloFileAttributes,
  } = useSilo();

  const [modalAttributes, setModalAttributes] = useState<SiloFileType | null>(null);

  const { t } = useTranslation();

  const headers = useMemo(
    () => [
      {
        label: 'Name',
        key: 'name',
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: 'Description',
        key: 'description',
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: 'Tags',
        key: 'tags_count',
        sortable: false,
        style: `${css({ minWidth: 200, maxWidth: 0 })}`,
      },
      {
        label: 'Added',
        key: 'created_at',
        sortable: false,
      },
      { label: '', key: 'actions', sortable: false },
    ],
    [],
  );

  const headerTableType = useMemo(
    () => [
      {
        label: t('Auto-increment'),
        key: 'auto_increment',
        sortable: false,
        style: `${css({ width: 50 })}`,
      },
      {
        label: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        label: 'Size',
        key: 'size',
        sortable: false,
      },
      {
        label: 'Type',
        key: 'type',
        sortable: false,
      },
    ],
    [t],
  );

  const handleSiloFile = useCallback(
    (item: SiloFileType) => {
      downloadSiloFile(item);
    },
    [downloadSiloFile],
  );

  const rows = useMemo(
    () =>
      files?.map((item: SiloFileType) => {
        const file = item.file as FileType;
        return [
          {
            id: item.id,
            status: item.status,
            name: item.name,
          },
          <div className={`${css(display.flex)}`} key={item.id}>
            <button type="button" className={`${styleButton}`} onClick={() => handleSiloFile(item)}>
              <FileIcon mimeType={file.mime} size={40} />
            </button>

            <div className={`${css(margin.leftXs)}`}>
              <div className={`${css({ fontWeight: 600 })}`}>{item.name}</div>
              <div className={`${css({ color: colors.greyLabel })}`}>{file?.name}</div>
              <div className={`${css({ color: colors.greyLabel })}`}>
                {parseFileSize(file?.size)}
              </div>
            </div>
          </div>,
          item.description,
          <TextEllipsis count={item.tags?.length} key={`${item.id}-tags`}>
            {item.tags?.map((tag) => tag.name).join(', ')}
          </TextEllipsis>,
          <div key={`${item.id}-owner`}>
            <IconList.Item
              size="xs"
              icon={statusIcon[item?.status]}
              color={statusColor[item?.status]}
              textAlign="left"
              label={
                <Text size="xs" weight="bold">
                  {statusLabel[item?.status]}
                </Text>
              }
            />

            <div>{item.owner?.name}</div>
            <div>{moment(item?.created_at).format('MMMM D, YYYY')}</div>
          </div>,
        ];
      }),
    [files, handleSiloFile],
  );

  const handleDeleteSiloFile = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('delete');
  }, []);

  const showAttributes = useCallback(
    (item: SiloFileType) => {
      if (showSilo) {
        setModalAttributes(item);
        fetchSiloFileAttributesHandler(showSilo.id, item.id);
      }
    },
    [showSilo],
  );

  // eslint-disable-next-line no-console
  console.log({ siloFileAttributes, showSilo });

  const actions = useMemo(
    () => [
      {
        label: 'See Attributes',
        action: showAttributes,
        shouldShow: (item: SiloFileType) => item.status === fileStatus.ready_for_use,
      },
      {
        label: 'Delete',
        action: handleDeleteSiloFile,
        confirm: true,
        shouldShow: (item: SiloFileType) =>
          item.status !== fileStatus.pre_processing && item.status !== fileStatus.processing,
      },
    ],
    [handleDeleteSiloFile, showAttributes],
  );

  // eslint-disable-next-line no-console
  console.log('element', { modalAttributes });

  return (
    <>
      {(isLoadingSilo || isUpdating) && <Loader active>Loading Silo</Loader>}
      <When condition={!isLoadingSilo}>
        {() => (
          <ContentGroup
            className={`${css(margin.topXs)}`}
            caption={t('Files')}
            rightComponent={
              <Button
                pill
                outline
                color="success"
                icon="icon-file-csv"
                onClick={() => setShowModalFile('new')}
              >
                Upload new File
              </Button>
            }
          >
            <BaslakeTable
              className={`${css(padding.topXs)}`}
              headers={headers}
              rows={rows}
              actions={actions}
              alignNested="left"
              highlightNested
              highlightParentRow
              condensed
            />

            <BaslakeModal
              size="large"
              title={`${modalAttributes?.name} File Attributes`}
              open={!!modalAttributes}
              closeHandler={() => setModalAttributes(null)}
            >
              <BaslakeModal.Content>
                <If condition={isLoadingSiloFileAttributes}>
                  <Then>
                    <Loader active>Test</Loader>
                  </Then>
                  <Else>
                    {siloFileAttributes
                      ?.filter((e) => filterAttributes.includes(e.type))
                      .map((attribute: SiloFileAttributeType) => {
                        const body = attribute.attributes?.map(
                          (item: SiloFileInnerAttributeType) => [
                            {
                              id: item.name,
                            },
                            item?.auto_increment ? t('True') : '',
                            item.name,
                            item.size,
                            item.type,
                          ],
                        );

                        return (
                          <>
                            <Header as="h5" className={`${styleFiles}`}>
                              {t('Table {{attribute.name}}', { attribute })}
                            </Header>
                            <BaslakeTable
                              // bulk
                              key={`${attribute?.name}-${attribute?.type}`}
                              className={`${css(padding.topXs)}`}
                              headers={headerTableType}
                              rows={body}
                              condensed
                            />
                          </>
                        );
                      })}
                  </Else>
                </If>
              </BaslakeModal.Content>
            </BaslakeModal>
          </ContentGroup>
        )}
      </When>
    </>
  );
}
export default SiloDetails;

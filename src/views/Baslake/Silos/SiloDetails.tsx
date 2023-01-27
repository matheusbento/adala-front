import { useCallback, useMemo } from 'react';

import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Loader } from 'semantic-ui-react';

import FileIcon from 'components/Library/FileIcon';
import TextEllipsis from 'components/Library/TextEllipsis';

import { parseFileSize } from 'helpers/index';

import '@translations/i18n';
import { useAuth } from 'hooks/Auth';

import FileType from 'types/FileType';
import { SiloFileType } from 'types/SiloFileType';

import { buttons, display } from 'utils/theme';

import BaslakeTable from 'views/Layout/BaslakeTable';

import Button from '@components/Library/Button';
import IconList from '@components/Library/IconList/IconList';
import Text from '@components/Library/Text';
import {
  statusColor,
  statusLabel,
  fileStatus,
} from '@constants/silosConstants';

import ContentGroup from '../../../components/Library/ContentGroup';
import { statusIcon } from '../../../constants/silosConstants';
import { margin, padding, colors } from '../../../utils/themeConstants';

const styleButton = css(buttons.plain, { verticalAlign: '-4px' });

const SiloDetails = () => {
  const { session } = useAuth();

  const {
    isLoadingSilo,
    isUpdating,
    setShowModalFile,
    files,
    downloadSiloFile,
  } = useSilos();

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
    []
  );

  const handleSiloFile = useCallback((item: SiloFileType) => {
    downloadSiloFile(item);
  }, []);

  const rows = useMemo(
    () =>
      files?.map((item: SiloFileType) => {
        const file = item.file as FileType;
        return [
          {
            id: item.id,
            status: item.status,
          },
          <div className={`${css(display.flex)}`} key={item.id}>
            <button
              type="button"
              className={`${styleButton}`}
              onClick={() => handleSiloFile(item)}
            >
              <FileIcon mimeType={file.mime} size={40} />
            </button>

            <div className={`${css(margin.leftXs)}`}>
              <div className={`${css({ fontWeight: 600 })}`}>{item.name}</div>
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
    [files]
  );

  const handleDeleteSiloFile = useCallback(() => {}, []);

  const actions = useMemo(
    () => [
      {
        label: 'Delete',
        action: handleDeleteSiloFile,
        confirm: true,
        shouldShow: (item: SiloFileType) =>
          item.status !== fileStatus.pre_processing &&
          item.status !== fileStatus.processing,
      },
    ],
    [handleDeleteSiloFile]
  );

  // const handleEditSilo = useCallback(() => {
  //   setShowModal('edit');
  //   // setInitialValues({
  //   //   ...Silo,
  //   //   start_date: Silo?.metadata?.find(
  //   //     (e: SiloMetadataType) => e.field === 'start_date'
  //   //   ).value,
  //   //   end_date: Silo?.metadata?.find(
  //   //     (e: SiloMetadataType) => e.field === 'end_date'
  //   //   ).value,
  //   //   model: beautifyJson(JSON.stringify(Silo.model)),
  //   //   metadata: Silo?.metadata?.filter(
  //   //     (e: SiloMetadataType) => !['start_date', 'end_date'].includes(e.field)
  //   //   ),
  //   // });
  // }, []);

  const handleDataVisualize = useCallback(() => {}, []);

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
          </ContentGroup>
        )}
      </When>
    </>
  );
};
export default SiloDetails;

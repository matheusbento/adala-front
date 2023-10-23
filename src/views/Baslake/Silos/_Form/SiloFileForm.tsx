import { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@components/Library/Button';
// import DragAndDropUploader from '@components/Library/DragAndDropUploader';
import Header from '@components/Library/Header';
import InputFile from '@components/Library/InputFile';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { useSilo } from '@hooks/Silos';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { Form as SemanticForm } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import { siloActionLabel } from 'constants/silosConstants';

import { fontWeight, margin } from 'utils/themeConstants';
import DragAndDropUploader from '@components/Library/DragAndDropUploader';
import { parseFileSize } from '@/helpers';
import InputDragDropFile from '@/components/Library/InputDragDropFile';
import { useFormContext } from 'react-hook-form';

const styleMr = css(margin.rightSm);

const styleButton = css({
  '&.ui.basic.blue.button': { boxShadow: 'none !important' },
});

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

const uploadMaxSize = parseInt(
  (import.meta.env.MIX_FILE_UPLOAD_TIMEOUT as string) || '2097152000', // Default: 2000MB
  10,
);

function SiloFileForm() {
  const { t } = useTranslation();
  const { showModalFile, setFormState, isLoadingSave, formState } = useSilo();
  const [currentFiles, setCurrentFiles] = useState([]);

  const isNewOrder = useMemo(() => showModalFile === 'new', [showModalFile]);

  const { reset } = useFormContext();

  useEffect(() => {
    document.getElementsByClassName('dimmer')[0].id = 'dimmer';
    animateScroll.scrollTo(0, { containerId: 'dimmer' });
  }, [formState]);

  const setFormJobOrderState = useCallback(() => {
    setFormState('form');
  }, [setFormState]);

  const submitAndSaveTemplate = useCallback(() => {
    // change('should_save_template', true);
    setFormState('preview');
  }, [setFormState]);

  const submitAndDontSaveTemplate = useCallback(() => {
    // change('should_save_template', false);
    setFormState('preview');
  }, [setFormState]);

  const onCancel = useCallback(() => {
    reset();
  }, []);

  console.log(Array.from(currentFiles));

  const fileFormats = ['.fits', '.fit'];

  const allowedTypes = [
    '',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'text/plain',
    'application/zip',
  ];

  return (
    <>
      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Files Alias')}
        </Header>

        <InputText name="name" placeholder="Enter name" required />
      </SemanticForm.Field>
      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        <Header as="h5" className={`${styleTitle}`}>
          {t('Description')}
        </Header>

        <InputTextArea name="description" placeholder="Enter description" />
      </SemanticForm.Field>

      <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
        {/* <InputFile type="file" name="file" multiple /> */}
        <InputDragDropFile
          multiple
          showFiles
          type="file"
          name="files"
          required
          subtitle={`.fits | Max size: ${parseFileSize(uploadMaxSize)}`}
          maxSize={uploadMaxSize}
          isOpen
          // allowedTypes={TimeSegments.acceptableFileTypes}
          // accept={TimeSegments.acceptableExtensions.join(',')}
          // isLoading={posting || fetching}
          allowedTypes={allowedTypes}
          accept={fileFormats.join(',')}
          // onFileSelected={(files: any, previous: any) => {
          //   console.log({ files, previous });
          //   setCurrentFiles(files);
          // }}
          // loaderLabel={posting ? 'Uploading file' : 'Validating data'}
        />
      </SemanticForm.Field>

      <SemanticForm.Group>
        <Button outline color="primary" fluid pill loading={isLoadingSave} type="submit">
          <SvgIcon path="icon-arrow-circle-right-line" size="md" className={`${styleMr}`} />
          {t('Upload Files')}
        </Button>
      </SemanticForm.Group>

      <SemanticForm.Group>
        <Button
          outline
          color="default"
          fluid
          pill
          loading={isLoadingSave}
          onClick={onCancel}
          type="button"
          className={`${styleButton}`}
        >
          {t('Cancel')}
        </Button>
      </SemanticForm.Group>
    </>
  );
}

export default SiloFileForm;

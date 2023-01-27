import { useCallback, useEffect, useMemo } from 'react';

import Button from '@components/Library/Button';
// import DragAndDropUploader from '@components/Library/DragAndDropUploader';
import Header from '@components/Library/Header';
import InputFile from '@components/Library/InputFile';
import InputText from '@components/Library/InputText';
import InputTextArea from '@components/Library/InputTextArea';
import SvgIcon from '@components/Library/SvgIcon';
import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import { animateScroll } from 'react-scroll';
import { Form as SemanticForm, Input } from 'semantic-ui-react';

// import ReduxField from '@components/Library/ReduxField';
// import ReduxInputCheckbox from '@components/Library/ReduxInputCheckbox';

import {
  acceptableExtensions,
  acceptableFileTypes,
  siloActionLabel,
} from 'constants/silosConstants';

import { parseFileSize } from 'helpers/index';

import { fontWeight, margin } from 'utils/themeConstants';

import SiloFormReviewContainer from './SiloFormReviewContainer';

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
  (process.env.MIX_FILE_UPLOAD_TIMEOUT as string) || '2097152000', // Default: 2000MB
  10
);

const SiloFileForm = () => {
  const { showModalFile, setFormState, isLoadingSave, formState } = useSilos();

  const isNewOrder = useMemo(() => showModalFile === 'new', [showModalFile]);

  const valid = true;

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
    // eslint-disable-next-line no-console
    console.log('äsdasdasdasd');
  }, []);

  return (
    <>
      {formState === 'form' ? (
        <>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              File Name
            </Header>

            <InputText name="name" placeholder="Enter Name" />
          </SemanticForm.Field>
          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <Header as="h5" className={`${styleTitle}`}>
              Description
            </Header>

            <InputTextArea name="description" placeholder="Enter Description" />
          </SemanticForm.Field>

          <SemanticForm.Field className={`${css(margin.bottomLg)}`}>
            <InputFile type="file" name="file" />
            {/* <DragAndDropUploader
              name="file"
              subtitle={`jpg, png, gif, pdf, doc, docx, odt, txt or zip. Max size: ${parseFileSize(
                uploadMaxSize
              )}`}
              uploadMaxSize={uploadMaxSize}
              allowedTypes={acceptableFileTypes}
              accept={acceptableExtensions.join(',')}
              onFileSelected={(files: FileList) => {
                // eslint-disable-next-line no-console
                console.log({ files });
                setFilesToUpload(files);
              }}
              isLoading={false}
              errorMessage={null}
              showFiles
              icon={undefined}
              label={undefined}
              mobileLabel={undefined}
              buttonText={undefined}
              multiple={false}
              maxSize={undefined}
              previousFiles={[]}
              input={undefined}
              loaderLabel={undefined}
            /> */}
          </SemanticForm.Field>

          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              onClick={!valid ? null : submitAndDontSaveTemplate}
              disabled={isLoadingSave}
              type={!valid ? 'submit' : 'button'}
            >
              {showModalFile
                ? `${siloActionLabel[showModalFile]} Silo File`
                : 'Loading'}
            </Button>
          </SemanticForm.Group>
          {isNewOrder && (
            <SemanticForm.Group>
              <Button
                outline
                color="primary"
                fluid
                pill
                loading={isLoadingSave}
                onClick={!valid ? null : submitAndSaveTemplate}
                type={!valid ? 'submit' : 'button'}
              >
                <SvgIcon
                  path="icon-arrow-circle-right-line"
                  size="md"
                  className={`${styleMr}`}
                />
                Create File
              </Button>
            </SemanticForm.Group>
          )}
        </>
      ) : (
        <>
          <SiloFormReviewContainer />
          <SemanticForm.Group>
            <Button
              color="success"
              fluid
              pill
              loading={isLoadingSave}
              type="submit"
            >
              Confirm and Create Silo
            </Button>
          </SemanticForm.Group>
          <SemanticForm.Group>
            <Button
              outline
              color="primary"
              fluid
              pill
              loading={isLoadingSave}
              onClick={setFormJobOrderState}
              type="button"
            >
              Edit
            </Button>
          </SemanticForm.Group>
        </>
      )}
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
          Cancel
        </Button>
      </SemanticForm.Group>
    </>
  );
};

export default SiloFileForm;

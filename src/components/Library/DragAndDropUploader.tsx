/* eslint-disable no-console */
import { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';

import { any, css } from 'glamor';
import { When } from 'react-if';
import { Dimmer, Loader } from 'semantic-ui-react';

import TypeOf from '../../constants/typeOfConstants';
import {
  colors,
  buttons,
  display,
  styles,
  margin,
  padding,
  text,
  fontSizes,
  fontWeight,
} from '../../utils/theme';
import SvgIcon from './SvgIcon';
import Text from './Text';

const styleLabel = {
  fontSize: '16px',
  color: colors.greyDarker,
  fontWeight: fontWeight.bold,
  ...margin.none,
};

const containerStyle = css(text.center, styles.dashedBorder);
const svgIconStyle = css(margin.bottomXs);
const styleComputerLabel = css(styleLabel, display.none, display.lgBlock);
const styleMobileLabel = css(styleLabel, display.lgNone);

const styleSubtitle = css(fontSizes.sm, margin.topXs, margin.bottomNone, {
  color: colors.grey,
});

const fileInputStyle = css(display.none);
const styleButton = css(buttons.pill, buttons.primary, margin.topLg);

const styleHasError = css({
  borderColor: `${colors.danger} !important`,
  color: colors.danger,
});

interface DragAndDropUploaderType {
  icon: string | null | undefined;
  label: string | null | undefined;
  mobileLabel: string | null | undefined;
  subtitle: string | null | undefined;
  buttonText: string | null | undefined;
  multiple: boolean;
  maxSize: number | null | undefined;
  allowedTypes: string[] | null | undefined;
  accept: string | null | undefined;
  previousFiles: string[];
  onFileSelected: any | null | undefined;
  input:
    | {
        onChange: any;
        value: any;
      }
    | null
    | undefined;
  isLoading: boolean;
  errorMessage: string | null | undefined;
  loaderLabel: string | null | undefined;
  showFiles: boolean;
  name: string | null | undefined;
}

const DragAndDropUploader = ({
  icon = 'icon-cloud-upload',
  label = 'Drag & Drop your file',
  mobileLabel = 'Select your file',
  buttonText = 'Browse to Upload',
  subtitle = null,
  multiple = false,
  maxSize = null,
  allowedTypes = null,
  accept = null,
  previousFiles = [],
  isLoading = false,
  errorMessage = null,
  loaderLabel = 'Uploading',
  showFiles = false,
  onFileSelected = null,
  name = 'file',
  input = null,
  ...props
}: DragAndDropUploaderType & Partial<{ uploadMaxSize: any }>) => {
  const [isDragging, setDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [internalErrorMessage, setErrorMessage] = useState(errorMessage);

  const fileInput = useRef<any>();

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e?.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prev) => prev + 1);
    if (e?.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }, []);

  const handleDragOut = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setErrorMessage(null);
      setDragCount((prev) => prev - 1);
      if (dragCount > 0) return;
      setDragging(false);
    },
    [dragCount]
  );

  const handleFilesSelected = useCallback(
    (e: ChangeEvent<HTMLInputElement>, files: FileList | undefined) => {
      console.log({ files });
      if (files?.length) {
        if (
          maxSize &&
          Array.from(files).filter((file) => file.size > maxSize).length
        ) {
          setErrorMessage('File size is too large. Please try again.');
          return;
        }
        if (
          allowedTypes &&
          Array.from(files).filter((file) => allowedTypes.includes(file.type))
            .length !== files.length
        ) {
          setErrorMessage(
            files.length > 1
              ? 'One or more file types are not allowed'
              : 'File type not allowed'
          );
          return;
        }
      }

      if (onFileSelected) {
        onFileSelected(files, previousFiles);
        return;
      }
      const target = e.target as HTMLInputElement;
      const f = target.files as FileList;

      input?.onChange([...(f ?? [])]);
    },
    [allowedTypes, maxSize, onFileSelected, input, previousFiles]
  );

  const handleDrop = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setErrorMessage(null);
      setDragging(false);
      setDragCount(0);
      if (
        !multiple &&
        e?.dataTransfer?.files &&
        e?.dataTransfer?.files?.length > 1
      ) {
        setErrorMessage('You cannot select multiple files');
      } else {
        handleFilesSelected(e, e?.dataTransfer?.files);
      }
      e?.dataTransfer?.clearData();
    },
    [handleFilesSelected, multiple]
  );

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(null);

      if (
        typeof fileInput?.current?.files === TypeOf.object &&
        fileInput?.current?.files &&
        fileInput?.current?.files?.length > 0
      ) {
        if (!multiple && fileInput.current.files.length > 1) {
          setErrorMessage('You cannot select multiple files');
        } else {
          handleFilesSelected(e, fileInput.current.files);
        }
        fileInput.current.value = '';
      }
    },
    [handleFilesSelected, multiple]
  );

  useEffect(() => {
    if (errorMessage !== internalErrorMessage) setErrorMessage(errorMessage);
  }, [errorMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const div = document.getElementById('drag');
    if (div) {
      // eslint-disable-next-line no-console
      console.log(div);
      div?.addEventListener('dragenter', handleDragIn);
      div?.addEventListener('dragleave', handleDragOut);
      div?.addEventListener('dragover', handleDrag);
      div?.addEventListener('drop', handleDrop);
      return () => {
        div?.removeEventListener('dragenter', handleDragIn);
        div?.removeEventListener('dragleave', handleDragOut);
        div?.removeEventListener('dragover', handleDrag);
        div?.removeEventListener('drop', handleDrop);
        setDragCount(0);
      };
    }
    return () => {};
  }, [previousFiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderFiles = useCallback(() => {
    const values = Array.isArray(input?.value) ? input?.value : [input?.value];
    return values?.map((e) => <div key={e.name}>{e?.name}</div>);
  }, [input]);

  // eslint-disable-next-line no-console
  console.log(showFiles, fileInput?.current?.files);

  return (
    <>
      <div
        id="drag"
        className={`${css(containerStyle, {
          borderColor: isDragging ? colors.primary : colors.silver,
        })} ${internalErrorMessage ? styleHasError : ''}`}
      >
        <When condition={showFiles && !!fileInput?.current?.files.length}>
          {() => (
            <>
              {renderFiles()}
              <hr />
            </>
          )}
        </When>
        <SvgIcon
          className={`${svgIconStyle}`}
          path={icon as string}
          size="xxl"
          color={colors.primary}
        />
        <p className={`${styleComputerLabel}`}>{label}</p>
        <p className={`${styleMobileLabel}`}>{mobileLabel}</p>
        {!!subtitle && <p className={`${styleSubtitle}`}>{subtitle}</p>}
        <button
          type="button"
          className={`${styleButton} primary`}
          onClick={() => fileInput?.current?.click()}
        >
          {buttonText}
        </button>
        <input
          {...props}
          ref={fileInput}
          type="file"
          name={name as string}
          className={`${fileInputStyle}`}
          onChange={handleFileInputChange}
          multiple={multiple}
          accept={accept as string}
        />
        <Dimmer active={isLoading} inverted>
          <Loader active>{loaderLabel}</Loader>
        </Dimmer>
      </div>
      {!!internalErrorMessage && (
        <Text
          className={`${css(text.center, padding.md, margin.none)}`}
          color="danger"
          as="p"
        >
          {internalErrorMessage}
        </Text>
      )}
    </>
  );
};

export default DragAndDropUploader;

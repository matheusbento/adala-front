import React, { useState, useCallback, useRef, useEffect } from 'react';
import { css } from 'glamor';
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

interface IInputProp {
  onChange: (files: File[] | string[]) => void;
  value: (File | string)[];
}

interface IDragAndDropUploaderProps {
  icon?: string;
  label?: string;
  mobileLabel?: string;
  subtitle?: string | null;
  buttonText?: string;
  multiple?: boolean;
  maxSize?: number | null;
  allowedTypes?: string[] | null;
  accept?: string | null;
  previousFiles?: string[];
  onFileSelected?: (files: FileList, previousFiles: string[]) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  loaderLabel?: string;
  name?: string;
  input?: IInputProp | null;
  showFiles?: boolean;
  [key: string]: any; // for the ...props spread
}

function DragAndDropUploader({
  icon = 'icon-cloud-upload',
  label = 'Drag & Drop your file',
  mobileLabel = 'Select your file',
  subtitle = null,
  buttonText = 'Browse to Upload',
  multiple = false,
  maxSize = null,
  allowedTypes = null,
  accept = null,
  previousFiles = [],
  onFileSelected = null,
  isLoading = false,
  errorMessage = null,
  loaderLabel = 'Uploading',
  name = 'file',
  input = null,
  showFiles = false,
  ...props
}: IDragAndDropUploaderProps) {
  const [isDragging, setDragging] = useState<boolean>(false);
  const [dragCount, setDragCount] = useState<number>(0);
  const [internalErrorMessage, setErrorMessage] = useState<string | null>(errorMessage);
  const dropArea = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prev) => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }, []);

  const handleDragOut = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setErrorMessage(null);
      setDragCount((prev) => prev - 1);
      if (dragCount > 0) return;
      setDragging(false);
    },
    [dragCount],
  );

  const handleFilesSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, files: FileList) => {
      if (maxSize && Array.from(files).filter((file) => file.size > maxSize).length) {
        setErrorMessage('File size is too large. Please try again.');
        return;
      }

      if (
        allowedTypes &&
        Array.from(files).filter((file) => allowedTypes.includes(file.type)).length !== files.length
      ) {
        setErrorMessage(
          files.length > 1 ? 'One or more file types are not allowed' : 'File type not allowed',
        );
        return;
      }

      if (onFileSelected) {
        onFileSelected(files, previousFiles);
        return;
      }
      input?.onChange([...e.target.files]);
    },
    [allowedTypes, maxSize, onFileSelected, input, previousFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setErrorMessage(null);
      setDragging(false);
      setDragCount(0);
      if (!multiple && e.dataTransfer.files.length > 1) {
        setErrorMessage('You cannot select multiple files');
      } else {
        handleFilesSelected(e, e.dataTransfer.files);
      }
      e.dataTransfer.clearData();
    },
    [handleFilesSelected, multiple],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(null);

      if (typeof fileInput.current.files === TypeOf.object && fileInput.current.files.length > 0) {
        if (!multiple && fileInput.current.files.length > 1) {
          setErrorMessage('You cannot select multiple files');
        } else {
          handleFilesSelected(e, fileInput.current.files);
        }
        fileInput.current.value = null;
      }
    },
    [handleFilesSelected, multiple],
  );

  useEffect(() => {
    if (errorMessage !== internalErrorMessage) setErrorMessage(errorMessage);
  }, [errorMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const div = dropArea.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
      setDragCount(0);
    };
  }, [previousFiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderFiles = useCallback(() => {
    const values = Array.isArray(input.value) ? input.value : [input.value];
    return values?.map((e) => {
      return <div key={e.name}>{e?.name}</div>;
    });
  }, [input]);

  return (
    <>
      <div
        ref={dropArea}
        className={`${css(containerStyle, {
          borderColor: isDragging ? colors.primary : colors.silver,
        })} ${internalErrorMessage ? styleHasError : ''}`}
      >
        <When condition={showFiles && input?.value?.length}>
          {() => (
            <>
              {renderFiles()}
              <hr />
            </>
          )}
        </When>
        <SvgIcon className={`${svgIconStyle}`} path={icon} size="xxl" color={colors.primary} />
        <p className={`${styleComputerLabel}`}>{label}</p>
        <p className={`${styleMobileLabel}`}>{mobileLabel}</p>
        {!!subtitle && <p className={`${styleSubtitle}`}>{subtitle}</p>}
        <button
          type="button"
          className={`${styleButton} primary`}
          onClick={() => fileInput.current.click()}
        >
          {buttonText}
        </button>
        <input
          {...props}
          ref={fileInput}
          type="file"
          name={name}
          className={`${fileInputStyle}`}
          onChange={handleFileInputChange}
          multiple={multiple}
          accept={accept}
        />
        <Dimmer active={isLoading} inverted>
          <Loader active>{loaderLabel}</Loader>
        </Dimmer>
      </div>
      {!!internalErrorMessage && (
        <Text className={`${css(text.center, padding.md, margin.none)}`} color="danger" as="p">
          {internalErrorMessage}
        </Text>
      )}
    </>
  );
}

export default DragAndDropUploader;

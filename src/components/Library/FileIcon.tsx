import { useMemo } from 'react';

import { css } from 'glamor';
import { ReactSVG } from 'react-svg';

export const mimeTypes: Record<string, string> = {
  'image/jpeg': 'icon-file-jpg',
  'image/png': 'icon-file-png',
  'image/gif': 'icon-file-gif',
  'application/pdf': 'icon-file-pdf',
  'application/msword': 'icon-file-word',
  'application/csv': 'icon-file-csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'icon-file-word',
  'application/vnd.oasis.opendocument.text': 'icon-file-word',
  'text/plain': 'icon-file-text',
  'application/zip': 'icon-file-zip',
  'application/octet-stream': 'icon-file-zip',
};

function FileIcon({ mimeType, size = 30 }: { mimeType: string; size: number | null | undefined }) {
  const iconStyles = useMemo(
    () =>
      css({
        '& svg': {
          width: `${size}px`,
          height: `${size}px`,
        },
      }),
    [size],
  );

  return <ReactSVG src={`/images/${mimeTypes[mimeType]}.svg`} className={`${iconStyles}`} />;
}

export default FileIcon;

import React from 'react';

import { render } from '@testing-library/react';

import FileIcon from './FileIcon';

describe('FileIcon component', () => {
  it('should display an icon.', () => {
    const { container } = render(
      <FileIcon mimeType="image/jpeg" size={null} />
    );

    const iconElement = container.querySelector(
      'div[data-src="/images/icon-file-jpg.svg"'
    );

    expect(iconElement).toBeTruthy();
  });
});

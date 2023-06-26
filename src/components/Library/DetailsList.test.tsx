import React from 'react';

import { render } from '@testing-library/react';

import DetailsList from './DetailsList';

const title = 'Test Title';
const description = 'Test Description';

describe('DetailsList component', () => {
  it('should display a title.', () => {
    const { queryByText } = render(<DetailsList title={title} />);

    const textElement = queryByText(title);

    expect(textElement).toBeTruthy();
  });

  it('should display a description.', () => {
    const { queryByText } = render(<DetailsList description={description} />);

    const textElement = queryByText(description);

    expect(textElement).toBeTruthy();
  });

  it('should display be able to set the width of the columns.', () => {
    const { container } = render(
      <DetailsList title={title} description={description} columnsWidths={[5, 7]} />,
    );

    const firstColumn = container.querySelector('div[class*="five"');
    const secondColumn = container.querySelector('div[class*="seven"');

    expect(firstColumn).toBeTruthy();
    expect(secondColumn).toBeTruthy();
  });
});

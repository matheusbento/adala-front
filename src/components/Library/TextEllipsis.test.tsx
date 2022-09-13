import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TextEllipsis from './TextEllipsis';

describe('TextEllipsis component', () => {
  it('should be able to display children.', () => {
    const { queryByText } = render(<TextEllipsis>Test Children</TextEllipsis>);

    const textElement = queryByText('Test Children');

    expect(textElement).toBeTruthy();
  });

  it('should be able to display ellipsis.', () => {
    const { queryByText } = render(
      <TextEllipsis count={3}>Test Children</TextEllipsis>
    );

    const textElement = queryByText('View All (3)');

    expect(textElement).toBeTruthy();
  });

  it('should be able to show overflow on click.', () => {
    const { queryByText } = render(
      <TextEllipsis count={3}>Test Children</TextEllipsis>
    );

    const viewAllElement = queryByText('View All (3)');

    fireEvent.click(viewAllElement as Element);

    const viewLessElement = queryByText('View less (3)');

    expect(viewLessElement).toBeTruthy();
  });

  it('should be able to as a paragraph.', () => {
    const { container } = render(
      <TextEllipsis paragraph>Test Children</TextEllipsis>
    );

    const paragraphElement = container.querySelector('p');

    expect(paragraphElement).toBeTruthy();
  });
});

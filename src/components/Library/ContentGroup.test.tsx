import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ContentGroup from './ContentGroup';

const mockedOnCaptionClick = jest.fn();

const LeftComponent = () => (
  <div>
    <p>Left Component</p>
  </div>
);

const RightComponent = () => (
  <div>
    <p>Right Component</p>
  </div>
);

describe('ContentGroup component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display children when expanded.', () => {
    const { queryByText } = render(<ContentGroup>test text</ContentGroup>);

    const textElement1 = queryByText('test text');

    expect(textElement1).toBeTruthy();
  });

  it('should not display children when collapsed.', () => {
    const { queryByText } = render(
      <ContentGroup collapsed={false}>test text</ContentGroup>
    );

    const textElement1 = queryByText('test text');

    expect(textElement1).toBeFalsy();
  });

  it('should display a caption.', () => {
    const { queryByText } = render(
      <ContentGroup caption="test caption" collapsed={false}>
        test text
      </ContentGroup>
    );

    const textElement1 = queryByText('test caption');

    expect(textElement1).toBeTruthy();
  });

  it('should execute onCaptionClick when caption is clicked.', () => {
    const { queryByText } = render(
      <ContentGroup
        caption="test caption"
        onCaptionClick={mockedOnCaptionClick}
      >
        test text
      </ContentGroup>
    );

    const textElement1 = queryByText('test caption');

    fireEvent.click(textElement1 as Element);

    expect(mockedOnCaptionClick).toHaveBeenCalled();
  });

  it('should display the left component.', () => {
    const { queryByText } = render(
      <ContentGroup leftComponent={<LeftComponent />}>test text</ContentGroup>
    );

    const textElement1 = queryByText('Left Component');

    expect(textElement1).toBeTruthy();
  });

  it('should display the right component.', () => {
    const { queryByText } = render(
      <ContentGroup rightComponent={<RightComponent />}>test text</ContentGroup>
    );

    const textElement1 = queryByText('Right Component');

    expect(textElement1).toBeTruthy();
  });

  it('should be able to display a disabled component state.', () => {
    const { queryByTestId } = render(
      <ContentGroup data-testid="test-id" disabled>
        test text
      </ContentGroup>
    );

    const textElement1 = queryByTestId('test-id');

    expect(/ css-.+/.test(textElement1?.className ?? '')).toBeTruthy();
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import MockDate from 'mockdate';

import Form from 'components/Library/Form';

import Datepicker from './InputDatepicker';

MockDate.set('2000-11-15T12:00:00.000-03:00');

const today = new Date();
const fullDateToday = today.toJSON().slice(0, 10);
const rawDateToday = fullDateToday.slice(-2);
const dateToday = /0\d/.test(rawDateToday) ? rawDateToday.slice(-1) : rawDateToday;

// eslint-disable-next-line no-console
console.warn = jest.fn();

const mockedSetDate = jest.fn();
const mockedSubmit = jest.fn();

describe('Datepicker component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should display an input with a placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    expect(inputElement as Element).toBeTruthy();
  });

  it('should display Date Picker on input focus.', () => {
    const { queryByPlaceholderText, container } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    const calendarElement = container.querySelector('div[class*="SingleDatePicker_picker"]');

    expect(calendarElement).toBeTruthy();
  });

  it('should set selected date on input value.', () => {
    const { queryByPlaceholderText, queryAllByText } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" />
      </Form>,
    );

    let inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    const dayElement = queryAllByText(dateToday);

    fireEvent.click(dayElement[1]);

    inputElement = queryByPlaceholderText('Select date');

    expect(inputElement as Element).toHaveProperty('value', fullDateToday);
  });

  it('should execute setDate function on date change.', () => {
    const { queryByPlaceholderText, queryAllByText } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" setDate={mockedSetDate} />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    const dayElement = queryAllByText(dateToday);

    fireEvent.click(dayElement[1]);

    expect(mockedSetDate).toHaveBeenCalledWith(fullDateToday);
  });

  it('should display the label as placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" required label="Test Placeholder" />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select test placeholder');

    expect(inputElement as Element).toBeTruthy();
  });

  it('should display dropdown for month and year.', () => {
    const { queryByPlaceholderText, container } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" withDropdowns />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    const selectElement = container.querySelectorAll('select');

    for (let i = 0; i < selectElement.length; i += 1) {
      expect(selectElement[i].children).toHaveLength(i % 2 === 0 ? 12 : 26);
    }
  });

  it('should be able to change the current month.', () => {
    const { queryByPlaceholderText, container } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" withDropdowns />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    let firstMonth = container.querySelectorAll('td[class*="CalendarDay"]')[0];

    expect(firstMonth.getAttribute('aria-label')).toBe('Not available. Sunday, October 1, 2000');

    const selectElement = container.querySelectorAll('select');

    fireEvent.change(selectElement[0], { target: { value: '0' } });

    [firstMonth] = container.querySelectorAll('td[class*="CalendarDay"]');

    expect(firstMonth.getAttribute('aria-label')).toBe('Not available. Saturday, January 1, 2000');
  });

  it('should be able to change the current month.', () => {
    const { queryByPlaceholderText, container } = render(
      <Form onSubmit={mockedSubmit}>
        <Datepicker name="test datepicker" withDropdowns />
      </Form>,
    );

    const inputElement = queryByPlaceholderText('Select date');

    fireEvent.focus(inputElement as Element);

    let firstMonth = container.querySelectorAll('td[class*="CalendarDay"]')[0];

    expect(firstMonth.getAttribute('aria-label')).toBe('Not available. Sunday, October 1, 2000');

    const selectElement = container.querySelectorAll('select');

    fireEvent.change(selectElement[1], { target: { value: '2025' } });

    [firstMonth] = container.querySelectorAll('td[class*="CalendarDay"]');

    expect(firstMonth.getAttribute('aria-label')).toBe('Wednesday, October 1, 2025');
  });
});

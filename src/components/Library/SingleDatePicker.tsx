import 'react-dates/initialize';
import { SingleDatePicker as SingleDatePickerComponent } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function SingleDatePicker({
  error,
  ...props
}: {
  error?: any;
  onDateChange?: any;
  onFocusChange?: any;
  displayFormat?: string;
  block?: boolean;
}) {
  const childProps = { error, ...props } as any;
  delete childProps.input;
  delete childProps.meta;
  delete childProps.withDropdowns;
  delete childProps.error;
  delete childProps.validate;

  return <SingleDatePickerComponent {...childProps} />;
}

export default SingleDatePicker;

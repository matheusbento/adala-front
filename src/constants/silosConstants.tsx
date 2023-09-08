export const siloActionLabel: Record<string, string> = {
  new: 'Create',
  edit: 'Edit',
  copy: 'Copy',
};

export const fileStatus = {
  created: 'created',
  pre_processing: 'pre_processing',
  ready_for_use: 'ready_for_use',
  processing: 'processing',
  invalid: 'invalid',
  processing_error: 'processing_error',
};

export const acceptableFileTypes = ['text/plain', 'text/csv', 'application/json', ''];

export const statusLabel = {
  [fileStatus.created]: 'Created',
  [fileStatus.pre_processing]: 'Pre Processing',
  [fileStatus.ready_for_use]: 'Ready for Use',
  [fileStatus.processing]: 'Processing',
  [fileStatus.invalid]: 'Invalid',
  [fileStatus.processing_error]: 'Processing Error',
};

export const statusIcon = {
  [fileStatus.created]: 'icon-hard-drive',
  [fileStatus.pre_processing]: 'icon-refresh',
  [fileStatus.ready_for_use]: 'icon-checkmark',
  [fileStatus.processing]: 'icon-refresh',
  [fileStatus.invalid]: 'icon-close',
  [fileStatus.processing_error]: 'icon-close',
};

export const statusColor = {
  [fileStatus.created]: 'gray',
  [fileStatus.pre_processing]: 'blue',
  [fileStatus.ready_for_use]: 'green',
  [fileStatus.processing]: 'yellow',
  [fileStatus.invalid]: 'red',
  [fileStatus.processing_error]: 'red',
};

export const acceptableExtensions = ['.json', '.pkl', '.txt', '.csv'];

export default siloActionLabel;

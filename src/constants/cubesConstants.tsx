export const cubeActionLabel: Record<string, string> = {
  new: 'Create',
  edit: 'Edit',
  copy: 'Copy',
};

export const steps = {
  details: 0,
  files: 1,
  mapping: 2,
  confirm: 3,
};

export const lastStep = steps.mapping;

export const filterAttributes: string[] = ['table'];

export const statuses = {
  creating: 'creating',
  ready_to_analysis: 'ready_to_analysis',
  creating_error: 'creating_error',
  invalid: 'invalid',
};

export const statusLabel = {
  [statuses.creating]: 'Creating',
  [statuses.ready_to_analysis]: 'Ready to Analysis',
  [statuses.creating_error]: 'Error on creation',
  [statuses.invalid]: 'Invalid',
};

export default cubeActionLabel;

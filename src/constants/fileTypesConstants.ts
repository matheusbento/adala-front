export const availableTypes: any = {
  txt: 'txt',
  pdf: 'pdf',
  jpeg: 'jpeg',
  png: 'png',
  gif: 'gif',
  doc: 'doc',
  docx: 'docx',
  zip: 'zip',
};

export const types: any = {
  'text/plain': availableTypes.txt,
  'application/pdf': availableTypes.pdf,
  'image/jpeg': availableTypes.jpeg,
  'image/png': availableTypes.png,
  'image/gif': availableTypes.gif,
  'application/msword': availableTypes.doc,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    availableTypes.docx,
  'application/zip': availableTypes.zip,
};

export const previewableTypes: any = {
  txt: availableTypes.txt,
  pdf: availableTypes.pdf,
  jpeg: availableTypes.jpeg,
  png: availableTypes.png,
  gif: availableTypes.gif,
  docx: availableTypes.docx,
};

export const printable = [
  availableTypes.pdf,
  availableTypes.jpeg,
  availableTypes.png,
  availableTypes.gif,
];

export const printableTypes = {
  pdf: 'pdf',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
};

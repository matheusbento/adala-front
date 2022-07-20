export type FieldArrayTypeSingle = {
  fields: Record<any, any>;
  name: string;
  push: (props: any) => any;
  prepend: (props: any) => any;
  update: (props: any) => any;
  required: string;
  remove: (props: any) => any;
  swap: (props: any) => any;
  watch: (props: any) => any;
  move: (props: any) => any;
  control: any;
};

import { LinkType } from './LinkType';

export type MetaType = {
  current_page: number;
  from: number;
  last_page: number;
  links: LinkType[] | null;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

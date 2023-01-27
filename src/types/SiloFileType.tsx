import { FileType } from './FileType';
import { TagType } from './TagType';
import { UserType } from './UserType';

export type SiloFileType = {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  file: FileType | File;
  tags: TagType[];
  owner: UserType;
};

export default SiloFileType;

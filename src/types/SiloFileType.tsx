import { FileType } from './FileType';
import { SiloFileAttributeType } from './SiloFileAttributeType';
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
  attributes: SiloFileAttributeType[];
  owner: UserType;
};

export default SiloFileType;

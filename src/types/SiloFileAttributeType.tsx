export type SiloFileInnerAttributeType = {
  auto_increment: boolean;
  foreign_key: boolean;
  name: string;
  size: string;
  type: string;
};

export type SiloFileAttributeType = {
  name: string;
  type: string;
  attributes: SiloFileInnerAttributeType[];
};

export default SiloFileAttributeType;

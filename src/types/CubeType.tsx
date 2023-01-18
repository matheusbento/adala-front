import { CubeMetadataType } from './CubeMetadataType';

export type CubeType = {
  id: string;
  identifier: string;
  name: string;
  model: string;
  start_date?: string;
  end_date?: string;
  metadata: CubeMetadataType[];
};

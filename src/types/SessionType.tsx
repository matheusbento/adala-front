import { UserType } from './UserType';

export type SessionType = {
  user: UserType;
  permissions: string[];
};

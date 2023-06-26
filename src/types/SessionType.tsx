import { AuthorizationType } from './AuthorizationType';
import { UserType } from './UserType';

export type SessionType = {
  user: UserType;
  authorization: AuthorizationType;
};

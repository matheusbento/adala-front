export type UserType = {
  id: string;
  login: string;
  password: string;
  email: string;
  name: string;
  avatar: string | null;
  permissions: string[];
  created_at: string;
};

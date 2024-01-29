export type UserResponse = {
  token: string;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
};

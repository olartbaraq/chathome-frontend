export type UserResponse = {
  message: string;
  token: string;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
};

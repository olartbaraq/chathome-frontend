export type UserResponse = {
  token: string;
  isLoggedIn: boolean;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
};

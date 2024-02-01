export type UserResponse = {
  token: string;
  isLoggedIn: boolean;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
};

export type AddUser = {
  email: string;
  user: string;
};
export type UserChat = {
  email: string;
  user_id: string;
};

export type Messages = {
  id: string;
  receiver_id: string;
  user_id: string;
  content: string;
  timestamp: string;
};

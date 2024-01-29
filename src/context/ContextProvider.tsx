import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserResponse } from "../typings";

export type StateContext = {
  userData: UserResponse;
  setUser: Dispatch<SetStateAction<UserResponse>>;
};

const defaultState = {
  userData: {
    user: {
      id: "",
      email: "",
    },
    token: "",
  },
  setUser: (user: UserResponse) => {},
} as StateContext;

export const UserContext = createContext(defaultState);

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [userData, setUser] = useState<UserResponse>({
    user: {
      id: "",
      email: "",
    },
    token: "",
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);

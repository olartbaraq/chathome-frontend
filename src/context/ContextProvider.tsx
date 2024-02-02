import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
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
    isLoggedIn: false,
  },
  setUser: () => {},
} as StateContext;

export const UserContext = createContext(defaultState);

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const storedUserData = localStorage.getItem("userData");
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [userData, setUser] = useState<UserResponse>(
    initialUserData || {
      user: {
        id: "",
        email: "",
      },
      token: "",
      isLoggedIn: false,
    }
  );

  useEffect(() => {
    // Save userData to localStorage whenever it changes//
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const clearLocalStorage = () => {
    localStorage.removeItem("userData");
  };

  const timeoutId = setTimeout(clearLocalStorage, 30 * 60 * 1000);

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    setTimeout(clearLocalStorage, 30 * 60 * 1000);
  };

  document.addEventListener("click", resetTimeout);
  document.addEventListener("keydown", resetTimeout);

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

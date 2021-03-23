import React, { createContext, useEffect, useState } from "react";
import { api } from "../api";

interface Props {}

export type UserContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserContextProvider: React.FC<Props> = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    api.user
      .profile()
      .then(() => setUserLoggedIn(true))
      .catch(() => setUserLoggedIn(false));
  }, []);
  return (
    <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

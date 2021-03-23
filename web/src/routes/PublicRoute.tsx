import React, { useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";

interface Props {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
}

export const PublicRoute: React.FC<Props> = ({ element, ...rest }) => {
  const [user] = useContext(UserContext)!;
  const navigate = useNavigate();
  return <Route element={!user ? element : <>{navigate(-1)} </>} {...rest} />;
};

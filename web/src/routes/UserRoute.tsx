import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "../common/redux/store";

interface Props {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
}

export const UserRoute: React.FC<Props> = ({ element, ...rest }) => {
  const { token } = useSelector((store: RootState) => store.user);
  return (
    <Route
      element={
        token ? element : <Navigate to={`/login?return-url=${rest.path}`} />
      }
      {...rest}
    />
  );
};

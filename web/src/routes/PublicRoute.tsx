import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useSearchParams } from "react-router-dom";
import { RootState } from "../common/redux/store";

interface Props {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
}

export const PublicRoute: React.FC<Props> = ({ element, ...rest }) => {
  const { token } = useSelector((store: RootState) => store.user);
  const [params] = useSearchParams();
  return (
    <Route
      element={
        !token ? (
          element
        ) : (
          <Navigate to={`/${params.get("return-url") ?? "dashboard"}`} />
        )
      }
      {...rest}
    />
  );
};

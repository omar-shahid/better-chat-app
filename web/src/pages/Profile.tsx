import React, { useEffect, useState } from "react";
import { api } from "../api";
import MainLayout from "../layouts/Main";
import { User } from "../types";
import { useQuery } from "react-query";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { data } = useQuery("profile", api.user.profile);
  return (
    <MainLayout title="Profile">
      <h1>{data?.profile.name}</h1>
    </MainLayout>
  );
};
export default ProfilePage;

import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import Loader from "../components/Loader";
import MainLayout from "../layouts/Main";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { data, isLoading } = useQuery("profile", api.user.profile);
  if (isLoading)
    return (
      <MainLayout title="Friends - Loading">
        <Loader />
      </MainLayout>
    );
  return (
    <MainLayout title="Profile">
      <h1>{data?.profile.name}</h1>
    </MainLayout>
  );
};
export default ProfilePage;

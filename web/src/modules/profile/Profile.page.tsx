import React from "react";
import { useQuery } from "react-query";
import { api } from "../../api";
import Loader from "../../common/components/Loader";
import MainLayout from "../../common/layouts/Main";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { data, isLoading } = useQuery("profile", api.auth.profile);
  if (isLoading)
    return (
      <MainLayout title="Friends - Loading">
        <Loader />
      </MainLayout>
    );
  return (
    <MainLayout title="Profile">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Profile
          </h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            Personal details
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.profile.name}
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.profile.email}
              </dd>
            </div>

            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Joined on</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.profile.createdAt}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </MainLayout>
  );
};
export default ProfilePage;

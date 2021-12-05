import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { NotificationAPI } from "./Notification.api";
import Loader from "../../common/components/Loader";
import MainLayout from "../../common/layouts/Main";

interface Props {}

const Notifications: React.FC<Props> = () => {
  const { data, isLoading } = useQuery(
    "notifications",
    NotificationAPI.getAllNotifications
  );

  if (isLoading)
    return (
      <MainLayout title="Notifications - Loading">
        <Loader />
      </MainLayout>
    );

  return (
    <MainLayout title="Notifications">
      <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        {data?.notifications.map((notification) => (
          <Link
            key={notification._id}
            to={
              notification.details.type === "RequestSent"
                ? `/requests`
                : notification.details.type === "RequestAccepted"
                ? "/friends"
                : "/"
            }
            className="block px-4 py-4 text-sm text-gray-700 border-b border-gray-300 hover:bg-gray-100"
            role="menuitem"
          >
            {notification.message}
          </Link>
        ))}
      </div>
    </MainLayout>
  );
};
export default Notifications;

import { RouteProps } from "react-router";

type Friend = {
  roomId: string;
  userId: string;
};
export interface User {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type findFriends = BasicUserInfo[];

export type RequestList = {
  sentRequests: BasicUserInfo[];
  recievedRequests: BasicUserInfo[];
};

export type BasicUserInfo = {
  _id: string;
  name: string;
  email: string;
};

export type Message = {
  message: string;
  createdAt: string;
  roomName: string;
  sender: {
    id: string;
    name: string;
  };
};

export interface Notification {
  _id: string;
  users: User[];
  details: {
    type: string;
    userInteracted: User;
  };
  message: string;
}

export interface RouteConfig extends RouteProps {
  authProtected?: boolean;
}

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
};

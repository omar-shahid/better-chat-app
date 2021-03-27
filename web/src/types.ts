export const API_URL = "http://localhost:4000/api";
type Friend = {
  roomId: string;
  userId: string;
};
export class User {
  name!: string;
  email!: string;
  password!: string;
  friends?: Friend[];
  recievedRequests?: User[];
  sentRequests?: User[];
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

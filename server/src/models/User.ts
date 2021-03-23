import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { FriendClass } from "./Friend";
import { RoomClass } from "./Room";

export class UserClass {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ ref: RoomClass })
  rooms?: Ref<RoomClass>[];

  @prop({ ref: "FriendClass", default: [] })
  friends?: Ref<FriendClass>[];

  @prop({ ref: UserClass })
  recievedRequests?: Ref<UserClass>[];

  @prop({ ref: UserClass })
  sentRequests?: Ref<UserClass>[];
}

export default getModelForClass(UserClass, {
  schemaOptions: { timestamps: true, strict: true, collection: "users" },
});

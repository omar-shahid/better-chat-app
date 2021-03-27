import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { UserClass } from "./User";

type Chat = {
  sender: Types.ObjectId;
  createdAt: Date;
  message: string;
};

export class RoomClass {
  @prop({ ref: "UserClass" })
  users: Ref<UserClass>[];

  @prop()
  name: string;

  @prop()
  chat?: Chat[];
}

export default getModelForClass(RoomClass, {
  schemaOptions: { timestamps: true, collection: "rooms" },
});

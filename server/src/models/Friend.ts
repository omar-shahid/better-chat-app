import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { RoomClass } from "./Room";
import { UserClass } from "./User";

export class FriendClass {
  @prop({ ref: () => RoomClass })
  roomId: Ref<RoomClass>;
  @prop({ ref: () => UserClass })
  users: Ref<UserClass>[];
}

export default getModelForClass(FriendClass, {
  schemaOptions: { timestamps: true, strict: true, collection: "friends" },
});

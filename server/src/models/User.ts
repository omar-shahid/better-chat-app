import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { FriendClass } from "./Friend";
import { RequestClass } from "./Request";
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

  @prop({ ref: RequestClass })
  requests?: Ref<RequestClass>[];

  @prop()
  socket?: string;
}

export default getModelForClass(UserClass, {
  schemaOptions: { timestamps: true, strict: true, collection: "users" },
});

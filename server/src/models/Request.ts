import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

export class RequestClass {
  @prop({ ref: "UserClass" })
  senderId: Ref<UserClass>;
  @prop({ ref: "UserClass" })
  recieverId: Ref<UserClass>;
}

export default getModelForClass(RequestClass, {
  schemaOptions: { timestamps: true, strict: true, collection: "requests" },
});

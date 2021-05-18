import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

class NotificationDetail {
  @prop({ required: true })
  type!: string;

  @prop({ required: true, ref: () => UserClass })
  userInteracted!: Ref<UserClass>;
}

export class NotificationClass {
  @prop({ ref: () => UserClass })
  users!: Ref<UserClass>[];

  @prop({ required: true })
  details: NotificationDetail;

  @prop({ required: true })
  message!: string;
}

export default getModelForClass(NotificationClass, {
  schemaOptions: {
    timestamps: true,
    strict: true,
    collection: "notifications",
  },
});

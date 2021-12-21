import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

export enum NotificationType {
  RequestReceived = "REQUEST_RECIEVED",
  RequestAccepted = "REQUEST_ACCEPTED",
  RequestDeclined = "REQUEST_DECLINED",
}

export class NotificationClass {
  @prop({ ref: () => UserClass })
  to!: Ref<UserClass>;

  @prop({ required: true, default: false })
  isRead: boolean;

  @prop({ required: true })
  link: string;

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

import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true })
  password!: string;
}

export default getModelForClass(User, { schemaOptions: { timestamps: true } });

import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    timestamps: true,
  },
);

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = model<IUser>('User', UserSchema);


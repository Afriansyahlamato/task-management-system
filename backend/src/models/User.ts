import mongoose from 'mongoose';
import { toJSONOpts } from './plugins/toJSON.ts';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true,
    },
  },
  { timestamps: true, toJSON: toJSONOpts as any }
);

export type IUser = mongoose.InferSchemaType<typeof UserSchema> & { id: string };

export const User = mongoose.model('User', UserSchema);

import { Schema } from 'mongoose';

export const toJSONOpts: Parameters<Schema['set']>[1] = {
  virtuals: true,
  versionKey: false,
  transform: (_: any, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  },
};

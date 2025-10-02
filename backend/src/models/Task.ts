import mongoose from 'mongoose';
import { toJSONOpts } from './plugins/toJSON.ts';

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'done', 'blocked', 'canceled'],
      default: 'todo',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      index: true,
    },
    due: { type: String, default: null },
  },
  { timestamps: true, toJSON: toJSONOpts as any }
);

TaskSchema.index({ ownerId: 1, status: 1, projectId: 1, createdAt: -1 });
TaskSchema.index({ status: 1, projectId: 1, createdAt: -1 });

export type ITask = mongoose.InferSchemaType<typeof TaskSchema> & { id: string };

export const Task = mongoose.model('Task', TaskSchema);

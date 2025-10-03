import mongoose from "mongoose";
import { toJSONOpts } from "./plugins/toJSON";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true, toJSON: toJSONOpts as any }
);

export type IProject = mongoose.InferSchemaType<typeof ProjectSchema> & {
  id: string ;
};

export const Project = mongoose.model("Project", ProjectSchema);

export type TaskStatus = "todo" | "in_progress" | "done";
export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  due?: string;
  createdAt: string;
  updatedAt: string;
};

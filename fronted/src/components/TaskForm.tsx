import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { useAppSelector } from "../redux/hooks";
import type { Task, TaskStatus } from "../redux/features/tasks/types";

export default function TaskForm({
  onSubmit,
  initial,
}: {
  onSubmit: (values: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  initial?: Partial<Task>;
}) {
  const projects = useAppSelector((s) => s.projects.items);
  const activeProject = useAppSelector((s) => s.projects.activeId);

  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState<TaskStatus>(
    (initial?.status as TaskStatus) || "todo"
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    (initial?.priority as any) || "low"
  );
  const [due, setDue] = useState(initial?.due || "");

  const DEFAULT_PROJECT_NAME = "None";
  const defaultProjectId = useMemo(() => {
    const byName = projects.find((p) => p.name === DEFAULT_PROJECT_NAME)?.id;
    if (byName) return byName;
    if (
      activeProject !== "all" &&
      projects.some((p) => p.id === activeProject)
    ) {
      return activeProject;
    }

    return projects[0]?.id || "";
  }, [projects, activeProject]);

  const [projectId, setProjectId] = useState<string>(
    (initial?.projectId as string | undefined) || ""
  );

  useEffect(() => {
    if (!projectId && defaultProjectId) {
      setProjectId(defaultProjectId);
    }
  }, [projectId, defaultProjectId]);

  const isValidProject = useMemo(
    () => !!projectId && projects.some((p) => p.id === projectId),
    [projectId, projects]
  );

  return (
    <form
      className="grid md:grid-cols-5 gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const base = {
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          priority,
          due: due || undefined,
        };

        // Fallback to default (Kamal) if current selection is invalid/empty
        const finalProjectId = isValidProject ? projectId : defaultProjectId;

        const payload = finalProjectId
          ? { ...base, projectId: finalProjectId }
          : base;
        onSubmit(payload as any);

        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("medium");
        setDue("");
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border rounded-lg px-3 py-2 md:col-span-2"
      />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {/* No explicit “None” here since you want Kamal by default.
            If you still want a None choice, add:
            <option value="">— None —</option> */}
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={due || ""}
        onChange={(e) => setDue(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="border rounded-lg px-3 py-2 md:col-span-4"
      />

      <Button type="submit" className="bg-slate-900 text-white md:col-span-1">
        Add Task
      </Button>
    </form>
  );
}

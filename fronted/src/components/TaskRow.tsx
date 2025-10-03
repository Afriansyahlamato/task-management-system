import React, { useMemo, useState } from "react";
import Button from "./Button";
import type { Task, TaskStatus } from "../redux/features/tasks/types";
import { useAppSelector } from "../redux/hooks";

function Badge({
  children,
  tone = "neutral",
  title,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "low" | "medium" | "high";
  title?: string;
}) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium";
  const tones: Record<string, string> = {
    neutral: "border-slate-300 text-slate-700 bg-white",
    low: "border-emerald-300 text-emerald-700 bg-emerald-50",
    medium: "border-amber-300 text-amber-800 bg-amber-50",
    high: "border-rose-300 text-rose-800 bg-rose-50",
  };
  return (
    <span className={`${base} ${tones[tone] ?? tones.neutral}`} title={title}>
      {children}
    </span>
  );
}

export default function TaskRow({
  t,
  onSave,
  onDelete,
  onToggleStatus,
  onOpen,
}: {
  t: Task;
  onSave: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (t: Task) => void;
  onOpen?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(t.title);
  const [description, setDescription] = useState(t.description || "");
  const [priority, setPriority] = useState(t.priority);
  const [due, setDue] = useState(t.due || "");

  const priorityTone =
    t.priority === "high" ? "high" : t.priority === "medium" ? "medium" : "low";

  const projects = useAppSelector((s) => s.projects.items);
  const projectId =
    (t as any).projectId ??
    (t as any).project?.id ??
    (t as any).project_id ??
    (t as any).project;
  const projectName = useMemo(() => {
    const fromTask = (t as any).projectName || (t as any).project?.name;
    if (!projects || projects.length === 0) return fromTask;
    const match = projects.find((p: any) => p.id === projectId);
    return match?.name ?? fromTask;
  }, [projects, projectId, t]);

  return (
    <li
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md cursor-pointer"
      onClick={() => !editing && onOpen?.()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (!editing && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onOpen?.();
        }
      }}
    >
      {!editing ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <h3
                className={`truncate text-base font-semibold leading-6 ${
                  t.status === "done"
                    ? "line-through text-slate-400"
                    : "text-slate-900"
                }`}
                title={t.title}
              >
                {t.title}
              </h3>
            </div>

            {t.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {t.description}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Badge tone="neutral" title="Due date">
                Due: {t.due || "—"}
              </Badge>
              <span aria-hidden>•</span>
              <span>Updated: {new Date(t.updatedAt).toLocaleString()}</span>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end"
          >
            <div className="flex flex-wrap items-center gap-2 sm:justify-end max-w-full">
              <Badge
                tone={priorityTone as any}
                title={`Priority: ${t.priority}`}
              >
                {t.priority}
              </Badge>

              {projectName ? (
                <Badge tone="neutral" title={`Project: ${projectName}`}>
                  <span className="flex items-center gap-1 max-w-[14rem] truncate">
                    <span aria-hidden>👤</span>
                    <span className="truncate">{projectName}</span>
                  </span>
                </Badge>
              ) : null}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <select
                value={t.status}
                onChange={(e) =>
                  onToggleStatus({ ...t, status: e.target.value as TaskStatus })
                }
                className="w-fit rounded-lg border border-slate-300 px-2 py-2 text-sm focus:border-slate-400 focus:outline-none sm:w-40"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <option value="todo">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Completed</option>
              </select>

              <div className="flex items-center gap-1.5">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                  }}
                  className="px-3 text-cyan-600"
                >
                  ✏️ Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(t.id);
                  }}
                  className="px-3  text-red-600"
                >
                  🪣 Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* edit mode */
        <form
          className="grid gap-3 md:grid-cols-4"
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            onSave(t.id, {
              title: title.trim(),
              description: description.trim() || undefined,
              priority,
              due: due || undefined,
            });
            setEditing(false);
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-400 focus:outline-none"
            placeholder="Task title"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-400 focus:outline-none"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <input
            type="date"
            value={due || ""}
            onChange={(e) => setDue(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-400 focus:outline-none"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="md:col-span-4 rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-400 focus:outline-none"
          />
          <div className="md:col-span-4 flex gap-2">
            <Button type="submit" className="bg-slate-900 text-white">
              Save
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(false);
                setTitle(t.title);
                setDescription(t.description || "");
                setPriority(t.priority);
                setDue(t.due || "");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </li>
  );
}

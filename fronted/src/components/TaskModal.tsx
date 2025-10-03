import { useEffect } from "react";
import type { Task } from "../redux/features/tasks/types";
import Button from "./Button";

interface ModalProps {
  task: Task | null;
  onClose: () => void;
}

export default function TaskModal({ task, onClose }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!task) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/10 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="pointer-events-auto w-full max-w-sm sm:max-w-lg md:max-w-xl
                   rounded-2xl bg-white shadow-xl border p-4 sm:p-5
                   max-h-[90dvh] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              id="task-modal-title"
              className="text-lg sm:text-xl font-semibold truncate break-words"
              title={task.title}
            >
              {task.title}
            </h3>
          </div>
          <Button
            onClick={onClose}
            aria-label="Close task details"
            className="bg-red-100 shrink-0 px-3 py-1 text-sm"
          >
            Close
          </Button>
        </div>

        <div className="mt-4">
          <hr className="w-full mb-3" />
          <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base break-words">
            {task.description?.trim()
              ? task.description
              : "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

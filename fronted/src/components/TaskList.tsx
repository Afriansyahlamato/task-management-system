import TaskRow from "./TaskRow";
import TaskModal from "./TaskModal";
import type { Task } from "../redux/features/tasks/types";
import { useState } from "react";

type Props = {
  tasks: Task[];
  onSave: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (t: Task) => void;
};

export default function TaskList({
  tasks,
  onSave,
  onDelete,
  onToggleStatus,
}: Props) {
  const [selected, setSelected] = useState<Task | null>(null);

  return (
    <>
      <div className="mt-3 -mx-4 sm:mx-0 overflow-x-auto">
        <ul className="min-w-[640px] sm:min-w-0 divide-y">
          {tasks.length === 0 ? (
            <p className="text-slate-500 p-4">No matching tasks.</p>
          ) : (
            tasks.map((t) => (
              <TaskRow
                key={t.id}
                t={t}
                onSave={onSave}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
                onOpen={() => setSelected(t)}
              />
            ))
          )}
        </ul>
      </div>
      <TaskModal task={selected} onClose={() => setSelected(null)} />
    </>
  );
}

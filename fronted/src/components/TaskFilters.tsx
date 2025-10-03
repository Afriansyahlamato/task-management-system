import Card from "./Card";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  resetFilters,
  setProjectFilter,
  setSearch,
  setSort,
  setStatusFilter,
} from "../redux/features/tasks/tasksSlice";

export default function TaskFilters() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const { search, status, projectId, sort } = useAppSelector((s) => s.tasks);

  return (
    <Card className="rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg space-y-4">
      {/* Search row */}
      <div className="flex items-center gap-3">
        <label className="whitespace-nowrap">Search</label>
        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search title/description"
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={status}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}
          className="border rounded-lg px-3 py-2 flex-1 min-w-[150px]"
        >
          <option value="all">All statuses</option>
          <option value="todo">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Completed</option>
        </select>

        <select
          value={projectId}
          onChange={(e) => dispatch(setProjectFilter(e.target.value as any))}
          className="border rounded-lg px-3 py-2 flex-1 min-w-[150px]"
        >
          <option value="all">All projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value as any))}
          className="border rounded-lg px-3 py-2 flex-1 min-w-[150px]"
        >
          <option value="created_desc">Newest first</option>
          <option value="due_asc">Due date (asc)</option>
        </select>

        <div className="ml-auto">
          <Button
            className="bg-gray-100"
            onClick={() => dispatch(resetFilters())}
          >
            Reset filters
          </Button>
        </div>
      </div>
    </Card>
  );
}

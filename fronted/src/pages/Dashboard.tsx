import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import TaskFilters from "../components/TaskFilters";
import ProjectPicker from "../components/ProjectPicker";
import TaskForm from "../components/TaskForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  sortedFilteredTasks,
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
} from "../redux/features/tasks/tasksSlice";
import { setProjects } from "../redux/features/projects/projectsSlice";
import type { Task } from "../redux/features/tasks/types";
import api from "../lib/api";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const tasks = useAppSelector(sortedFilteredTasks);
  const all = useAppSelector((s) => s.tasks.items);
  const projects = useAppSelector((s) => s.projects.items);

  useEffect(() => {
    (async () => {
      const [pRes, tRes] = await Promise.all([
        api.get("/projects"),
        api.get("/tasks"),
      ]);
      dispatch(setProjects(pRes.data));
      dispatch(setTasks(tRes.data));
    })();
  }, [dispatch]);

  const completed = useMemo(
    () => all.filter((t) => t.status === "done").length,
    [all]
  );

  async function addTask(values: Omit<Task, "id" | "createdAt" | "updatedAt">) {
    const res = await api.post("/tasks", values);
    dispatch(addTaskLocal(res.data));
  }
  async function toggleStatus(t: Task) {
    const res = await api.patch(`/tasks/${t.id}`, { status: t.status });
    dispatch(updateTaskLocal(res.data));
  }

  async function saveInline(id: string, patch: Partial<Task>) {
    const res = await api.patch(`/tasks/${id}`, patch);
    dispatch(updateTaskLocal(res.data));
  }
  async function removeTask(id: string) {
    console.log(id);
    await api.delete(`/tasks/${id}`);
    dispatch(deleteTaskLocal(id));
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 grid gap-6">
      <div className="grid gap-1">
        <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
          Hello, {user?.name} 👋
        </h2>
        <p className="text-slate-600">Manage tasks across projects.</p>
      </div>

      {/* Top summary + controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="group rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <h3 className="font-medium mb-2">🗂️ Overview</h3> <hr /> <br />
          <p className="text-slate-600">
            📋 Total tasks: <b>{all.length}</b>
          </p>
          <p className="text-slate-600">
            ✅ Completed: <b>{completed}</b>
          </p>
          <p className="text-slate-600">
            ⏳ Pending: <b>{all.length - completed}</b>
          </p>
        </Card>
        {/* search and filters */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <ProjectPicker />
          <TaskFilters />
        </div>
      </div>

      <Card>
        <TaskForm onSubmit={addTask} />
      </Card>
      {/* Tasks list */}
      <Card>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="font-bold  mb-3">Tasks</h3>
        </div>
        <TaskList
          tasks={tasks}
          onSave={saveInline}
          onDelete={removeTask}
          onToggleStatus={toggleStatus}
        />
      </Card>

      {projects.length === 0 && (
        <Card>
          <p className="text-sm text-slate-600">
            Create a project to start adding tasks.
          </p>
        </Card>
      )}
    </div>
  );
}

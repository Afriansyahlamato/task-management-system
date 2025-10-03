import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setActiveProject,
  addProjectLocal,
  setProjects,
} from "../redux/features/projects/projectsSlice";
import api from "../lib/api";

export default function ProjectPicker() {
  const dispatch = useAppDispatch();
  const { activeId } = useAppSelector((s) => s.projects);
  const projects = useAppSelector((s) => s.projects.items);
  const [name, setName] = useState("");

  async function addProject() {
    if (!name.trim()) return;
    const res = await api.post("/projects", { name });
    dispatch(addProjectLocal(res.data));
    dispatch(setActiveProject(res.data.id));
    setName("");
  }

  return (
    <Card className="flex flex-col md:flex-row gap-3 md:items-center group rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <label className="text-sm text-slate-600 shrink-0">
          Assign to Project
        </label>
        <select
          value={activeId}
          onChange={(e) => dispatch(setActiveProject(e.target.value as any))}
          className="border rounded-lg px-3 py-2 w-full min-w-0"
        >
          <option value="all">All Users</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto min-w-0">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new user in project"
          className="border rounded-lg px-3 py-2 flex-1 min-w-0 md:w-64"
        />
        <Button
          className="bg-slate-900 text-white shrink-0 whitespace-nowrap px-4"
          onClick={addProject}
        >
          Add
        </Button>
      </div>
    </Card>
  );
}

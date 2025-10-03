import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "./types";
import type { RootState } from "../../store";

type TasksState = {
  items: Task[];
  search: string;
  status: TaskStatus | "all";
  projectId: "all" | string;
  sort: "created_desc" | "due_asc";
};
const initial: TasksState = {
  items: [],
  search: "",
  status: "all",
  projectId: "all",
  sort: "created_desc",
};

const slice = createSlice({
  name: "tasks",
  initialState: initial,
  reducers: {
    setTasks: (s, a: PayloadAction<Task[]>) => {
      s.items = a.payload;
    },
    addTaskLocal: (s, a: PayloadAction<Task>) => {
      s.items = [a.payload, ...s.items];
    },
    updateTaskLocal: (s, a: PayloadAction<Task>) => {
      const i = s.items.findIndex((t) => t.id === a.payload.id);
      if (i > -1) s.items[i] = a.payload;
    },
    deleteTaskLocal: (s, a: PayloadAction<string>) => {
      s.items = s.items.filter((t) => t.id !== a.payload);
    },
    setSearch: (s, a: PayloadAction<string>) => {
      s.search = a.payload;
    },
    setStatusFilter: (s, a: PayloadAction<TasksState["status"]>) => {
      s.status = a.payload;
    },
    setProjectFilter: (s, a: PayloadAction<TasksState["projectId"]>) => {
      s.projectId = a.payload;
    },
    setSort: (s, a: PayloadAction<TasksState["sort"]>) => {
      s.sort = a.payload;
    },
    resetFilters: (s) => {
      s.search = "";
      s.status = "all";
      s.projectId = "all";
      s.sort = "created_desc";
    },
  },
});

export const {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
  setSearch,
  setStatusFilter,
  setProjectFilter,
  setSort,
  resetFilters,
} = slice.actions;
export default slice.reducer;

const selectItems = (s: RootState) => s.tasks.items;
const selectSearch = (s: RootState) => s.tasks.search;
const selectStatus = (s: RootState) => s.tasks.status;
const selectProject = (s: RootState) => s.tasks.projectId;
const selectSort = (s: RootState) => s.tasks.sort;

export const filteredTasks = createSelector(
  [selectItems, selectSearch, selectStatus, selectProject],
  (items, search, status, projectId) => {
    const q = search.trim().toLowerCase();
    return items.filter(
      (t) =>
        (status === "all" || t.status === status) &&
        (projectId === "all" || t.projectId === projectId) &&
        (!q ||
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q))
    );
  }
);

export const sortedFilteredTasks = createSelector(
  [filteredTasks, selectSort],
  (items, sort) => {
    const copy = [...items];
    if (sort === "created_desc")
      copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "due_asc")
      copy.sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
    return copy;
  }
);

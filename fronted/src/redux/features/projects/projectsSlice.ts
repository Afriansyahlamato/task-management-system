import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "./types";

type ProjectsState = { items: Project[]; activeId: "all" | string };
const initial: ProjectsState = { items: [], activeId: "all" };

const slice = createSlice({
  name: "projects",
  initialState: initial,
  reducers: {
    setProjects: (s, a: PayloadAction<Project[]>) => {
      s.items = a.payload;
      if (s.activeId !== "all" && !a.payload.some((p) => p.id === s.activeId))
        s.activeId = "all";
    },
    addProjectLocal: (s, a: PayloadAction<Project>) => {
      s.items = [a.payload, ...s.items];
    },
    setActiveProject: (s, a: PayloadAction<"all" | string>) => {
      s.activeId = a.payload;
    },
  },
});

export const { setProjects, addProjectLocal, setActiveProject } = slice.actions;
export default slice.reducer;

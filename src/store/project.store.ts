import { create } from "zustand";

type ProjectState = {
  projectId: string | null;
  isEditModeOn: boolean;

  setProjectId: (id: string | null) => void;
  setEditMode: (value: boolean) => void;

  reset: () => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projectId: null,
  isEditModeOn: false,

  setProjectId: (id) => set({ projectId: id }),
  setEditMode: (value) => set({ isEditModeOn: value }),

  reset: () => set({ projectId: null, isEditModeOn: false }),
}));
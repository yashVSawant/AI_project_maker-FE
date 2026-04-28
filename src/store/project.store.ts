import { create } from "zustand";

type ConditionState = {
  action: "HIDDEN" | "DISABLED";
  conditionId: string;
  rule: string;
  active?: boolean;
};

type ProjectState = {
  projectId: string | null;
  isEditModeOn: boolean;
  conditions: ConditionState[];
  selectedComponentId?: string | null;

  setProjectId: (id: string | null) => void;
  setEditMode: (value: boolean) => void;
  addConditions: (condtions: ConditionState[]) => void;
  removeCondition: (conditionId: string) => void;
  updateConditionState: (updatedCondition: { conditionId: string; active: boolean }) => void;
  clearConditions: () => void;
  setSelectedComponentId: (id: string | null) => void;

  reset: () => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projectId: null,
  isEditModeOn: false,
  conditions: [],
  selectedComponentId: null,

  setProjectId: (id) => set({ projectId: id }),
  setEditMode: (value) => set({ isEditModeOn: value }),
  addConditions: (condtions) =>
    set((state) => ({
      conditions: [...state.conditions, ...condtions],
    })),
  removeCondition: (conditionId) =>
    set((state) => ({
      conditions: [...state.conditions.filter((c) => c.conditionId !== conditionId)],
    })),
  updateConditionState: (updatedCondition: { conditionId: string; active: boolean }) =>
    set((state) => ({
      conditions: [
        ...state.conditions.map((c) =>
          c.conditionId === updatedCondition.conditionId ? { ...c, ...updatedCondition } : c,
        ),
      ],
    })),
  clearConditions: () => set({ conditions: [] }),
  setSelectedComponentId: (id) => set({ selectedComponentId: id }),

  reset: () => set({ projectId: null, isEditModeOn: false, conditions: [] }),
}));

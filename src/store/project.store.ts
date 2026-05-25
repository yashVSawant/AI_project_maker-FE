import { create } from "zustand";

type ConditionState = {
  action: "HIDDEN" | "DISABLED";
  conditionId: string;
  rule: string;
  active?: boolean;
};

export type updateComponentType = {
  components:any[] ,
  conditions:any[] ,
  componentConditions:any[],
  componentId:string , 
  projectId:string ,
}

type ProjectState = {
  projectId: string | null;
  isEditModeOn: boolean;
  conditions: ConditionState[];
  selectedComponentId?: string | null;
  aiUpdateComponentData : updateComponentType | null;
  projectQueryData:any

  setProjectId: (id: string | null) => void;
  setEditMode: (value: boolean) => void;
  addConditions: (condtions: ConditionState[]) => void;
  removeCondition: (conditionId: string) => void;
  updateConditionState: (updatedCondition: { conditionId: string; active: boolean }) => void;
  clearConditions: () => void;
  setSelectedComponentId: (id: string | null) => void;
  setAiUpdatecomponentData:(value:updateComponentType|null)=>void;
  setProjectQueryData:(value:any)=>void;

  reset: () => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projectId: null,
  isEditModeOn: false,
  conditions: [],
  selectedComponentId: null,
  aiUpdateComponentData:null,
  projectQueryData:{},

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
  setAiUpdatecomponentData:(value:updateComponentType|null)=>set({aiUpdateComponentData:value }),
  setProjectQueryData:(value:any)=>set({projectQueryData:value}),

  reset: () => set({ projectId: null, isEditModeOn: false, conditions: [] }),
}));

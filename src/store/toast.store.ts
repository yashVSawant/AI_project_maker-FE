import { create } from "zustand";

type Toast = {
  message: string;
  type: "success" | "error";
};

type ToastState = {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));

export const showToast =(toast:Toast)=>{ 
    useToastStore.getState().showToast(toast);
}
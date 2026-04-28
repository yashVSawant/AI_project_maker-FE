import { useEffect } from "react";
import { useToastStore } from "../store/toast.store";

const Toast = () => {
  const { toast, clearToast } = useToastStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);
  if (!toast) return null;

  return (
    <div
      className={`fixed w-[350px]  h-[50px] top-4 left-1/2 -translate-x-1/2 px-4 py-2 !z-[99] rounded-lg shadow-md border border-3-solid
    ${toast.type === "success" ? "border-green-500 !bg-green-100" : "border-red-500 !bg-red-100"}`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;

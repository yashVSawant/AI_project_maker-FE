import axiosInstance from "../../../apis/axios";

export const loginUser = async (payload: { email: string; password: string }) => {
  return await axiosInstance.post("/auth/login", payload);
};

export const signupUser = async (payload: { email: string; password: string ,name :string}) => {
  return await axiosInstance.post("/auth/signup", payload);
};

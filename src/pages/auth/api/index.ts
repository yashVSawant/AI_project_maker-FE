import axiosInstance from "../../../apis/axios"

export const loginUser = async(payload:{ email: string;
  password: string;})=>{
    return await axiosInstance.post("/auth/login",payload)
}
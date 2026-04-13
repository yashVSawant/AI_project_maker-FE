import axiosInstance from "../../../apis/axios"

export const generateProject = async(message:string)=>{
    return await axiosInstance.post("/project/generate",{message});
}
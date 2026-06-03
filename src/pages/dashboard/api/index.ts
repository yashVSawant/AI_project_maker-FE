import axiosInstance from "../../../apis/axios";
import type { ComponentDTO } from "../../project/dto/component.dto";

export const generateProject = async (promt: string) => {
  return await axiosInstance.post("/project/generate", { promt });
};

export const editProjectComponent = async (promt: string , componentId:string , componentTree?:any) => {
  return await axiosInstance.post(`/project/generate/${componentId}`, { promt ,componentId , componentTree});
};

export const updateComponents = async (projectId: string , componentId:string , body:{components:any[] , conditions:any[] ,componentConditions:any[]}) => {
  return await axiosInstance.post(`/project/${projectId}/${componentId}`,body );
};

export const updateSingleComponentManually = async (projectId: string , componentId:string , body:ComponentDTO) => {
  return await axiosInstance.post(`/project/${projectId}/${componentId}/manual`,body );
};

export const getComponentData = async (componentId:string)=>{
  return await axiosInstance.get(`project/component/${componentId}`)
}

export const getUserData = async ()=>{
  return await axiosInstance.get("user/me")
}

import axiosInstance from "../../../apis/axios";
import type { ComponentDTO } from "../dto/component.dto";

export const getProject = async (id: string): Promise<{ data: { components: ComponentDTO[] } }> => {
  return await axiosInstance.get(`/project/${id}`);
};

export const getProjects = async () => {
  
  return await axiosInstance.get("/project");
};

export const editDescription = async(componentId:string, description:string)=>{
  return await axiosInstance.patch(`/project/description/${componentId}`,{description})
}

export const deleteDescription = async(componentId:string, )=>{
  return await axiosInstance.delete(`/project/description/${componentId}`)
}

export const editRules = async(componentId:string, rule:string)=>{
  return await axiosInstance.patch(`/project/description/${componentId}`,{rule})
}

export const deleteRules = async(componentId:string )=>{
  return await axiosInstance.delete(`/project/description/${componentId}`)
}

export const deleteComponent = async (componentId:string)=>{
  return await axiosInstance.delete(`project/component/${componentId}`)
}

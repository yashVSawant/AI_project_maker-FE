
import axiosInstance from "../../../apis/axios";
import type { ComponentDTO } from "../dto/component.dto"

export const getProject = async(id:string) : Promise<{data:{components:
ComponentDTO[]}}> =>  {
    // return  {
    //   "type": "div",
    //   "className": "p-4 bg-gray-100",
    //   "children": [
    //     {
    //       "type": "h1",
    //       "text": "Welcome",
    //       "className": "text-xl font-bold"
    //     },
    //     {
    //       "type": "div",
    //       "text": "Welcome",
    //       "className": "text-xl font-bold"
    //     },
    //     {
    //       "type": "div",
    //       "text": "Welcome",
    //       "className": "text-xl bg-blue-500 text-white p-20 font-bold"
    //     }
    //   ]
    // }
 return await axiosInstance.get(`/project/${id}`);
}

export const getProjects = async()  =>  {
  //   return  [
  //   { id: 1, name: "Project 1" },
  //   { id: 2, name: "Project 2" },
  //   { id: 3, name: "Project 3" },
  // ]
 return await axiosInstance.get("/project");
}
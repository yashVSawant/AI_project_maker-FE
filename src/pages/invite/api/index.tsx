import axiosInstance from "../../../apis/axios";


export const getInvite=async(inviteId:string)=>{
    return await axiosInstance.get(`/invite/${inviteId}`);
}

export const acceptInvite = async (inviteId:string) => {
    return  axiosInstance.post(`/invite/accept/${inviteId}`);
  };

export const rejectInvite = async (inviteId:string) => {
    return axiosInstance.post(`/invite/reject/${inviteId}`);
  };

  export const getProjectUsers = async(projectId:string)=>{
    return axiosInstance.get(`invite/list/${projectId}`)
  }

  export const inviteUsers = async(payload:{projectId:string , email:string , role:string})=>{
    return axiosInstance.post('invite',payload)
  }

  export const removeUser = async (userId:string ,projectId:string) =>{
    return axiosInstance.delete(`invite/remove/${projectId}/${userId}`)
  }

  export const getAllInvites = async ()=>{
    return axiosInstance.get("invite/list");
  }

  export const cancelInvite = async (userId:string ,projectId:string) =>{
    return axiosInstance.delete(`invite/cancel/${projectId}/${userId}`)
  }

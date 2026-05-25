import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button, { ButtonVariant } from "../../../components/Button"
import { useProjectStore, type updateComponentType } from "../../../store/project.store"
import { updateComponents } from "../../dashboard/api"
import DraggableWrapper from "../../../components/DragableWrapper"

const ConfirmComponentUpdate = ()=>{
    const queryClient = useQueryClient()
    const {aiUpdateComponentData ,setAiUpdatecomponentData ,projectQueryData} =useProjectStore()
    const {mutate:updateComponentsMutate , isPending:isPendingUpdateComponents} = useMutation({
    mutationKey:["generate-componet"],
    mutationFn:( data:updateComponentType)=>updateComponents(data.projectId,data.componentId , data),
    onSuccess:()=>{
      // console.log(data);
      // queryClient.invalidateQueries({queryKey:["projects"]});
          //   queryClient.setQueryData(["projects",projectId],(oldData:any)=>{
          //     // if (!oldData) return oldData;
          //     console.log("new data",data.data)
          // if (!oldData) return oldData;
          // return {
          //   ...oldData,
          //   data: {
          //     ...oldData.data,
          //     components: replaceSubtreeInTree(
          //       oldData.data.components,
          //       componentId,
          //       data.data.tree[0]
          //     )
          //   }
          // };
          //   })
            // onClose()
            setAiUpdatecomponentData(null)
    }
  })
  const projectId = aiUpdateComponentData?.projectId
return aiUpdateComponentData ?
<DraggableWrapper>
<div className="flex gap-2 p-2 ">
        <Button variant={ButtonVariant.PRIMARY} onClick={()=>{
          aiUpdateComponentData && updateComponentsMutate(aiUpdateComponentData)
        }} disabled={isPendingUpdateComponents}>{isPendingUpdateComponents ? "Updating ...":"Apply"}</Button>
        <Button variant={ButtonVariant.SECONDARY} onClick={()=>{
          queryClient.setQueryData(["projects",projectId],()=>{
            return projectQueryData
          })
          setAiUpdatecomponentData(null)
        }} disabled={isPendingUpdateComponents}>Remove</Button>
</div></DraggableWrapper>:<></>
}

export default ConfirmComponentUpdate
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { editProjectComponent } from "../../dashboard/api";
import { Footer, Modal, Title } from "../../../components/Modal";
import Button from "../../../components/Button";
import { getComponentTreeInTree, replaceSubtreeInTree } from "../../../utils/data.helper";
import { useParams } from "react-router-dom";
import { useProjectStore } from "../../../store/project.store";

type AIEditModalProps = {
  open: boolean;
  onClose: () => void;
  componentId: string;
};

const AIEditModal: React.FC<AIEditModalProps> = ({
  open,
  onClose,
  componentId,
}) => {
  const queryClient = useQueryClient()
  const [prompt, setPrompt] = useState("");

  const { id, editId } = useParams();

  const {  setAiUpdatecomponentData ,projectQueryData } = useProjectStore()

  const projectId = id || editId

  const {mutate , isPending} = useMutation({
    mutationKey:["generate-componet"],
    mutationFn:({prompt ,nodeTree}:{prompt:string ,nodeTree:any})=>editProjectComponent(prompt,componentId ,nodeTree),
    onSuccess:(data)=>{
      console.log(data);
      // queryClient.invalidateQueries({queryKey:["projects"]});
        id &&
      setAiUpdatecomponentData({
                componentConditions:data.data.componentConditions,
                components:data.data.components,
                conditions:data.data.conditions,
                componentId,
                projectId:id,
              })
            queryClient.setQueryData(["projects",projectId],(oldData:any)=>{
              // if (!oldData) return oldData;
              // setProjectQueryData(oldData)
              
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              components: replaceSubtreeInTree(
                oldData.data.components,
                componentId,
                data.data.tree[0]
              )
            }
          };
            })
            // onClose()
    }
  })
  const handleApply = ()=>{

    const componentTree = getComponentTreeInTree(projectQueryData.data.components , componentId)
    mutate({prompt ,nodeTree:componentTree})
  }

  return (
    <Modal open={open} onClose={onClose}>
   <div className="flex flex-col justify-center items-center w-full p-3">

        <Title>Edit with AI</Title>

        <textarea
          placeholder="Describe what you want to change..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          className="!w-full p-2 border border-gray"
        />

<Footer>
        <div className="flex justify-center gap-3">
          <Button onClick={onClose} disabled={isPending}>
            Cancel
          </Button>

          <Button onClick={handleApply} disabled={isPending}>
            {isPending ? "Thinking..." : "Apply"}
          </Button>
        </div>
        </Footer>
      </div>
    </Modal>
  );
};

export default AIEditModal;
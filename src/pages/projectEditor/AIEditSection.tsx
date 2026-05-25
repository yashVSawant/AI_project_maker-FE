import React, { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button";
import { editProjectComponent } from "../dashboard/api";
import { getComponentTreeInTree, replaceSubtreeInTree } from "../../utils/data.helper";
import { useProjectStore } from "../../store/project.store";

type Props = {
  projectId:string;
  selectedComponentId: string;
};

const AiEditSection = ({
  projectId,
  selectedComponentId,
}: Props) => {
  const queryClient = useQueryClient()
  const [prompt, setPrompt] = useState("");
  const {  setAiUpdatecomponentData ,projectQueryData } = useProjectStore();

  const componentTree = useMemo(() => {
    return getComponentTreeInTree(
      projectQueryData?.data?.components,
      selectedComponentId
    );
  }, [projectQueryData, selectedComponentId]);
  

  const {mutate , isPending} = useMutation({
      mutationKey:["generate-componet"],
      mutationFn:()=>editProjectComponent(prompt,selectedComponentId ,componentTree),
      onSuccess:(data)=>{
        console.log(data);
        // queryClient.invalidateQueries({queryKey:["projects"]});
        setAiUpdatecomponentData({
                  componentConditions:data.data.componentConditions,
                  components:data.data.components,
                  conditions:data.data.conditions,
                  componentId:selectedComponentId,
                  projectId,
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
                  selectedComponentId,
                  data.data.tree[0]
                )
              }
            };
              })
              // onClose()
      }
    })

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary">
      <h3 className="text-sm font-semibold mb-4">AI Edit</h3>

      <textarea
        placeholder="Describe changes..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        className="w-full border text-xs border-primary-500 rounded-xl p-3 outline-none resize-none"
      />

      <div className="flex justify-end mt-4">
        <Button
          onClick={() => mutate()}
          disabled={isPending}
        >
          {isPending ? "Thinking..." : "Apply AI Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AiEditSection;
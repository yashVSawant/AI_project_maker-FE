import { useQuery } from "@tanstack/react-query";
import RenderComponent from "./components/RenderComponent";
import { getProject } from "./api";
import {   useParams } from "react-router-dom";
import { useProjectStore } from "../../store/project.store";
import { useEffect } from "react";
import { extractConditions } from "../../utils/data.helper";
import ConfirmComponentUpdate from "./components/ConfirmComponentUpdate";
import ComponentEditorSpace from "../projectEditor/ComponentEditorSpace";

const Project = () => {
  const { projectId } = useParams();
  const { projectId:id, addConditions, clearConditions ,setProjectQueryData } = useProjectStore();
  

  const currentProjectId = projectId  || id;
  const { data, isFetching } = useQuery({
    queryKey: ["projects", currentProjectId],
    queryFn: () => getProject(currentProjectId!).then((data)=>{
      setProjectQueryData(data);
      return data;
    }),
    enabled: Boolean(currentProjectId),
  });

  const compoents = data?.data?.components || null;
  useEffect(() => {
    if (compoents) {
      const extractedConditions = extractConditions(compoents);
      addConditions(extractedConditions.conditionsArray);
    }
    return () => {
      clearConditions();
    };
  }, [compoents?.length]);

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex w-full  justify-between ">
        <div className="w-full overflow-auto">
      {isFetching || !compoents ? (
        <div>Loading...</div>
      ) : (
        compoents.map((c) => <RenderComponent {...c} key={c.id} />)
      )}
      </div>
      <ComponentEditorSpace/>
      </div>
     <ConfirmComponentUpdate/>
    </div>
    
  );
};
export default Project;

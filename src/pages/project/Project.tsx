import { useQuery } from "@tanstack/react-query";
import RenderComponent from "./components/RenderComponent";
import { getProject } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import DraggableButton from "../../components/DragableButton";
import { Pencil } from "lucide-react";
import { useProjectStore } from "../../store/project.store";
import { useEffect } from "react";
import { extractConditions } from "../../utils/data.helper";

const Project = () => {
  const { id, editId } = useParams();
  const navigate = useNavigate();
  const { projectId, addConditions, clearConditions } = useProjectStore();

  const isEditMode = Boolean(!id); // If there's an id, we're in view mode, otherwise it's edit mode
  const currentProjectId = id || editId || projectId;
  const { data, isFetching } = useQuery({
    queryKey: ["projects", currentProjectId],
    queryFn: () => getProject(currentProjectId!),
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
      {isFetching || !compoents ? (
        <div>Loading...</div>
      ) : (
        compoents.map((c) => <RenderComponent {...c} key={c.id} />)
      )}
      {!isEditMode && (
        <DraggableButton
          Icon={<Pencil size={20} />}
          onClick={() => navigate(`/edit/project/${currentProjectId}`)}
        />
      )}
    </div>
  );
};
export default Project;

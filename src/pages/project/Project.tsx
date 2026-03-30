import { useQuery } from "@tanstack/react-query";
import RenderComponent from "./components/RenderComponent";
import { getProject } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import DraggableButton from "../../components/DragableButton";
import { Pencil } from "lucide-react";

const Project = () => {
  const { editId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(editId); // If there's an editId, we're in edit mode, otherwise it's view mode

const {data , isFetching} = useQuery({queryKey:["projects"], 
  queryFn :getProject});

    return (
        <div className="w-full h-full bg-gray-200">
          {isFetching || !data ? <div>Loading...</div> : <RenderComponent {...data} />}
          {!isEditMode && (
            <DraggableButton Icon={<Pencil size={20} />} onClick={() => navigate(`/edit/project/${editId}`)} />
          )}
        </div>
        
    )
}   
export default Project;
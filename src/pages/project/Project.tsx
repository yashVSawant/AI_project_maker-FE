import { useQuery } from "@tanstack/react-query";
import RenderComponent from "./components/RenderComponent";
import { getProject } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import DraggableButton from "../../components/DragableButton";
import { Pencil } from "lucide-react";

const Project = () => {
  const { id ,editId } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(!id); // If there's an id, we're in view mode, otherwise it's edit mode

const {data , isFetching} = useQuery({queryKey:["projects"], 
  queryFn :()=>getProject(id!),
  enabled:Boolean(id)
});

console.log("data",data?.data)
  const compoents = data?.data?.components || null;


    return (
        <div className="w-full h-full bg-gray-200">
          {isFetching || !compoents ? <div>Loading...</div> : compoents.map(c=><RenderComponent {...c} />)}
          {!isEditMode && (
            <DraggableButton Icon={<Pencil size={20} />} onClick={() => navigate(`/edit/project/${editId}`)} />
          )}
        </div>
        
    )
}   
export default Project;
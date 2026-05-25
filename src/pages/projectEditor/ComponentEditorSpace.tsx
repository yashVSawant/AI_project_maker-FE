import { useNavigate, useParams } from "react-router-dom";
import AiEditSection from "./AIEditSection";
import ManualEditSection from "./ManualEditSection";
import { X } from "lucide-react";




const ComponentEditorSpace = () => {
  const navigate = useNavigate()

  const { projectId:pId, componentId } = useParams();
  const projectId = pId!
    const selectedComponentId =componentId!

  if(!componentId || componentId === "edit" || !projectId){
    return (
      <></>
    );
  }
  return (
 <div className="w-[50%]  bg-primary-100 p-5 pr-1 pt-0 flex flex-col gap-5">
        {/* HEADER */}
        <div className="w-full pb-1 sticky top-0 z-50  pt-5 !bg-primary-100">
        {/* <div className="  bg-primary rounded-2xl p-5 shadow-sm border border-primary-500"> */}
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl font-bold">Component Editor</h2>
            <X className="h-4 w-4" onClick={()=>navigate(`/project/${projectId}/edit`)} />
          </div>
          
          <p className="text-gray-500 mt-1 text-sm">
            Edit selected component manually or using AI.
          </p>
        {/* </div> */}
        </div>
<div className="h-[83vh] overflow-auto rounded-lg flex flex-col pr-1 gap-2">
<AiEditSection
projectId={projectId}
  selectedComponentId={selectedComponentId}
/>

<ManualEditSection
projectId={projectId}
selectedComponentId={selectedComponentId}
/>

        </div>
      </div>
    
  );
};

export default ComponentEditorSpace;

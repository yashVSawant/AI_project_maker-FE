import ResizableLayout from "../../components/ResizeableLayout";
import Chat from "../dashboard/components/Chat";
import Project from "./Project";

const CreateNewProject = () => {
  return (
    <div className="flex h-full w-full"><ResizableLayout leftComponent={<Project />} rightComponent={<Chat />} /></div>
    
    )   
}
export default CreateNewProject;
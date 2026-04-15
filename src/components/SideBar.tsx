import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../pages/project/api";
import { useProjectStore } from "../store/project.store";



const Sidebar = () => {
  const navigate = useNavigate();
  const {setProjectId ,setEditMode} = useProjectStore()

  const {data , isFetching} = useQuery({queryKey:["projects"], 
  queryFn :()=>getProjects(),
},
);

const projects = data?.data || []

  return (
    <aside className="w-[200px] bg-gray-300 h-[calc(100vh-60px)] top-[60px]">
      <div className="flex items-center hover:text-white hover:bg-gray-500 gap-2 p-3 bg-gray-400 mb-3 cursor-pointer" onClick={() =>{
         navigate("add/project");
         setEditMode(false);
         setProjectId(null)
        }
         }>
  <h3 className="text-xl font-bold mb-1">Projects</h3>
  <Plus size={18}  
   />
  </div>

  <nav className="flex font-semibold flex-col gap-2 p-2">
    {/* links */}
    {isFetching && <div>Loading...</div>}
    {projects?.length  && projects.map((project:{id:string,name:string}) => (
      <a
        key={project.id}
        // href={`/project/${project.id}`}
        className="text-gray-700 hover:text-white hover:bg-gray-500 rounded px-2 py-1"
        onClick={()=>{
          setProjectId(project.id);
          setEditMode(true)
          navigate(`/project/${project.id}`)
        }}
      >
        {project.name}
      </a>
    ))}
  </nav>
</aside>
  );
};

export default Sidebar;
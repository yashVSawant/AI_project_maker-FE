import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../pages/project/api";



const Sidebar = () => {
  const navigate = useNavigate();

  const {data , isFetching} = useQuery({queryKey:["projects"], 
  queryFn :()=>getProjects(),
},
);

  return (
    <aside className="w-[200px] bg-gray-300 h-[calc(100vh-60px)] top-[60px]">
      <div className="flex items-center hover:text-white hover:bg-gray-500 gap-2 p-3 bg-gray-400 mb-3 cursor-pointer" onClick={() => navigate("add/project")}>
  <h3 className="text-xl font-bold mb-1">Projects</h3>
  <Plus size={18}  
   />
  </div>

  <nav className="flex font-semibold flex-col gap-2 p-2">
    {/* links */}
    {isFetching && <div>Loading...</div>}
    {data?.length  && data.map((project) => (
      <a
        key={project.id}
        href={`/project/${project.id}`}
        className="text-gray-700 hover:text-white hover:bg-gray-500 rounded px-2 py-1"
      >
        {project.name}
      </a>
    ))}
  </nav>
</aside>
  );
};

export default Sidebar;
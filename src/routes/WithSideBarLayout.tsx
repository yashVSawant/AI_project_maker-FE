import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import ProjectSidebar from "../pages/project/components/ProjectSideBar";

const WithSideBarLayout = () => {
  const { projectId } = useParams();
  const showProjectSideBar = Boolean(projectId)
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {showProjectSideBar ? 
        <ProjectSidebar/> :<Sidebar />}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WithSideBarLayout;

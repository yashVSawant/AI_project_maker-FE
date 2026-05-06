import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Conditions from "../pages/project/components/Conditions";
import { useState } from "react";
import { useProjectStore } from "../store/project.store";
import { useQuery } from "@tanstack/react-query";
import { getAllInvites } from "../pages/invite/api";

const Header = ({ showBack, isOpenRoute }: { showBack?: boolean; isOpenRoute?: boolean }) => {
  const navigate = useNavigate();
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const {projectId} = useProjectStore();
  const { data  } = useQuery({
    queryKey: ["project-users", projectId],
    queryFn: () => getAllInvites()
  });

  const isProjectRoute = window.location.pathname.includes("project");

  const invitesCount = data?.data.length ||0

  const logoutHandler = () => {
    localStorage.removeItem("AI_PROJECT_TOKEN");
    navigate("/login");
  };

  return (
    <header className="h-[60px] shadow sticky top-0 z-50 bg-gray-700 flex items-center justify-between px-4 text-white">
      <div className="flex gap-3 items-center">
        {showBack && (
          <div
            onClick={() => navigate(-1)}
            className="px-3 py-3  rounded hover:bg-gray-300 cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </div>
        )}
        <h1 className="font-bold text-2xl">AI Project Maker</h1>
      </div>
      <nav className="flex gap-3">
        
        {isProjectRoute&&<span className="cursor-pointer" onClick={() => setIsConditionsOpen(true)}>
          Conditions
        </span>}
        {isProjectRoute && <Link to={`/members/${projectId}`}>members</Link>}
        {invitesCount ?<Link to={"invites"}>invites {invitesCount}</Link>:<></>}
        
        {!isOpenRoute && <Link to="/dashboard">Dashboard</Link>}
        {!isOpenRoute && (
          <Link to="/login" onClick={logoutHandler}>
            Logout
          </Link>
        )}
      </nav>
      <Conditions isOpen={isConditionsOpen} onClose={() => setIsConditionsOpen(false)} />
    </header>
  );
};

export default Header;

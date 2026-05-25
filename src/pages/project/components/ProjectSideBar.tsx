import {
  LayoutPanelLeft,
  Users,
  ShieldCheck,
  Sparkles,
  Settings,
  Layers3,
  Workflow,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Conditions from "./Conditions";
import Button, { ButtonVariant } from "../../../components/Button";

const ProjectSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const menuItems = [
    // {
    //   id: "pages",
    //   icon: Layers3,
    //   route: "pages",
    //   label: "Pages",
    // },
    {
      id: "project",
      icon: Layers3,
      route: `project/${projectId}`,
      label: "Project",
    },
    {
      id: "users",
      icon: Users,
      route: `/members/${projectId}`,
      label: "Users",
    },
    {
      id: "conditions",
      icon: ShieldCheck,
      route: "conditions",
      action:()=>setIsConditionsOpen(true),
      label: "Conditions",
      hideOnRoute:`/members/${projectId}`
    },
    // {
    //   id: "flow",
    //   icon: Workflow,
    //   route: "flow",
    //   label: "Project Flow",
    // },
    // {
    //   id: "ai",
    //   icon: Sparkles,
    //   route: "ai",
    //   label: "AI Edit",
    // },
  ].filter((menu)=> !menu.hideOnRoute || location.pathname !== menu.hideOnRoute );
  
  return (
    <>
    <aside className="w-[92px] h-screen bg-white border-r border-primary-100 shadow-[4px_0px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between py-5 px-3">

      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-dark to-primary-500 flex items-center justify-center shadow-md">
            <Workflow size={20} className="text-white" />
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => navigate("/projects")}
            variant={ButtonVariant.HOVER_PRIMARY}
            className="p-3 pt-4 text-gray-500 hover:text-black"
          >
            <Home size={20} />
          </Button>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col items-center gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname.includes(item.route);

            return (
              <Button
                key={item.id}
                onClick={() => item.action ?item.action() : navigate(item.route)}
                variant={isActive ? ButtonVariant.PRIMARY : ButtonVariant.HOVER_PRIMARY}
              >
                <Icon
                  size={20}
                  className={`${
                    isActive
                      ? "text-black"
                      : "text-gray-500 group-hover:text-black"
                  }`}
                />

                {/* TOOLTIP */}
                <div className="absolute z-[999] left-[60px] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-lg">
                  {item.label}
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-3">

        {/* SETTINGS */}
        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-primary/60 hover:text-black transition-all duration-200"
          title="Settings"
        >
          <Settings size={20} />
        </button>

        {/* USER */}
        <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center font-semibold text-sm shadow-sm cursor-pointer">
          YS
        </div>
      </div>
    </aside>
    <Conditions isOpen={isConditionsOpen} onClose={() => setIsConditionsOpen(false)} />
      </>
  );
};

export default ProjectSidebar;
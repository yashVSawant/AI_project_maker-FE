import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  FolderOpen,
  Users,
  LayoutTemplate,
  Bot,
  Plug,
  LogOut,
  Plus,
  Workflow,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllInvites } from "../pages/invite/api";
import { useProjectStore } from "../store/project.store";
import Button, { ButtonVariant } from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProjectId } = useProjectStore();
  const [openSignOutConfirm ,setOpenSignOutConfirm] = useState(false)

  const { data: invitesData } = useQuery({
    queryKey: ["project-users"],
    queryFn: () => getAllInvites(),
  });

  const invitesCount =
    invitesData?.data?.filter((i: any) => i.status !== "ACCEPTED").length || 0;

  const logoutHandler = () => {
    localStorage.removeItem("AI_PROJECT_TOKEN");
    navigate("/login");
  };

  const menuItems = [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   icon: LayoutTemplate,
    //   route: "/dashboard",
    // },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      route: "/projects",
    },
    // {
    //   id: "templates",
    //   label: "Templates",
    //   icon: LayoutTemplate,
    //   route: "/templates",
    // },
    // {
    //   id: "agents",
    //   label: "AI Agents",
    //   icon: Bot,
    //   route: "/agents",
    // },
    // {
    //   id: "integrations",
    //   label: "Integrations",
    //   icon: Plug,
    //   route: "/integrations",
    // },
    {
      id: "invites",
      label: "Invites",
      icon: Users,
      route: "/invites",
      count: invitesCount,
    },
  ];

  return (
    <aside className="w-[270px] h-screen overflow-y-auto bg-white border-r border-primary-100 shadow-[4px_0px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between px-4 py-5">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex items-start gap-2 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-dark to-primary-500 flex items-center justify-center shadow-md">
            <Workflow size={18} className="text-white" />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-gray-800">
              AI Powered Project Flow Maker
            </h2>
            <p className="text-[11px] text-gray-400">
              Build faster with AI
            </p>
          </div>
        </div>

        {/* NEW PROJECT BUTTON */}
        <Button
          onClick={() => {
            navigate("/add/project");
            setProjectId(null);
          }}
          leftIcon={<Plus size={18} />}
          variant={ButtonVariant.PRIMARY}
          className="w-full mb-4 !p-4 font-bold text-lg !rounded-lg"
          >
          New Project
        </Button>

        {/* NAVIGATION */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.route ||
              location.pathname.startsWith(item.route);

            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(item.route);

                  if (item.id !== "invites") {
                    setProjectId(null);
                  }
                }}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-primary"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`${
                      isActive
                        ? ""
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />

                  <span className="text-[15px] font-medium">
                    {item.label}
                  </span>
                </div>

                {item.count ? (
                  <div className="min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-semibold">
                    {item.count}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

      </div>

      {/* BOTTOM */}
      <div>
        {/* USER */}
        
        <div className="flex items-center gap-3 px-2 mb-4">

          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-gray-800 truncate">
              example name
            </h4>

            <p className="text-xs text-gray-400 truncate">
              email@example.com
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <Button
          onClick={()=>setOpenSignOutConfirm(true)}
          className="w-full px-4 py-3 rounded-2xl flex !justify-start"
          variant={ButtonVariant.DANGER_GHOST}
          leftIcon={<LogOut size={18} />}
        >
          <span className="font-medium">Logout</span>
        </Button>
        <div className="flex items-center gap-3 px-2 mb-4">

          <div className="flex-1 overflow-hidden">
            

            <p className="text-xs text-gray-400 truncate">
              support@example.com
            </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
       open={openSignOutConfirm} 
       onClose={()=>setOpenSignOutConfirm(false)} 
       onConfirm={logoutHandler} 
       message="Are you sure you want to logout?"
       title=""
       />
    </aside>
  );
};

export default Sidebar;
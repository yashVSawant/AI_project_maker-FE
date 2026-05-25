import { useQuery } from "@tanstack/react-query";
import {
  FolderKanban,
  ArrowUpRight,
  Crown,
  Pencil,
  Eye,
} from "lucide-react";
import { getProjects } from "../project/api";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const projects = data?.data || [];

  const getRoleStyles = (role: string) => {
    switch (role) {
      case "ADMIN":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <Crown size={12} />,
        };

      case "EDITOR":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: <Pencil size={12} />,
        };

      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <Eye size={12} />,
        };
    }
  };

  return (
    <div className="p-8 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Your Projects
        </h1>

        <p className="text-gray-500 mt-2">
          Build and manage your AI powered projects.
        </p>
      </div>

      {/* LOADING */}
      {isFetching && (
        <div className="text-gray-500 font-medium">
          Loading projects...
        </div>
      )}

      {/* EMPTY */}
      {!isFetching && projects.length === 0 && (
        <div className="bg-white border border-primary-100 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary-100 flex items-center justify-center mb-5">
            <FolderKanban size={34} className="text-amber-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Projects Yet
          </h2>

          <p className="text-gray-500 max-w-md">
            Start building your first AI powered application
            by creating a new project.
          </p>
        </div>
      )}

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map(
          (project: {
            id: string;
            name: string;
            role: string;
          }) => {
            const roleStyles = getRoleStyles(project.role);

            return (
              <div
                key={project.id}
                id={"project-" + project.id}
                onClick={() => {
                  navigate(`/project/${project.id}/edit`);
                }}
                className="
                  group
                  bg-white
                  border
                  border-primary-100
                  rounded-3xl
                  p-6
                  cursor-pointer
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <FolderKanban
                      size={28}
                      className="text-amber-600"
                    />
                  </div>

                  <div
                    className={`
                      flex items-center gap-1
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${roleStyles.bg}
                      ${roleStyles.text}
                    `}
                  >
                    {roleStyles.icon}
                    {project.role}
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {project.name}
                  </h2>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    AI powered project workspace with components,
                    flows and integrations.
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-200 border-2 border-white"></div>

                    <div className="w-8 h-8 rounded-full bg-primary-300 border-2 border-white -ml-3"></div>

                    <div className="w-8 h-8 rounded-full bg-primary-400 border-2 border-white -ml-3"></div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-600 font-semibold text-sm">
                    Open
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Projects;
import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/auth/Login";
import Project from "../../pages/project/Project";
import AddEditProject from "../../pages/project/AddEditProject";
import Signup from "../../pages/auth/Signup";
import ProjectMembers from "../../pages/invite/ProjectMembers";
import InviteListPage from "../../pages/invite/invites";

const pagesRoutes = [
  { path: "/dashboard", element: Dashboard, permission: "auth" },
  { path: "/login", element: Login, permission: "public" },
  {path:"/signup",element:Signup , permission:'public'},
  { path: "/add/project", element: AddEditProject, permission: "auth", sideBar: false },
  { path: "/project/:id", element: Project, permission: "auth", sideBar: false },
  { path: "/edit/project/:editId", element: AddEditProject, permission: "auth", sideBar: false },
  {path:"members/:projectId",element:ProjectMembers , permission:"auth",sideBar:false},
  {path:"invites",element:InviteListPage,permission:"auth"},
];

export default pagesRoutes;

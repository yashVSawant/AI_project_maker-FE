import Login from "../../pages/auth/Login";
import Project from "../../pages/project/Project";
import AddEditProject from "../../pages/project/AddEditProject";
import Signup from "../../pages/auth/Signup";
import ProjectMembers from "../../pages/invite/ProjectMembers";
import InviteListPage from "../../pages/invite/invites";
import Projects from "../../pages/project/Projects";
import ComponentEditorSpace from "../../pages/projectEditor/ComponentEditorSpace";

const pagesRoutes = [
  { path: "/projects", element: Projects, permission: "auth" },
  { path: "/login", element: Login, permission: "public" },
  {path:"/signup",element:Signup , permission:'public'},
  { path: "/add/project", element: AddEditProject, permission: "auth" },
  { path: "/project/:projectId/:componentId", element: Project, permission: "auth",  },
  {path:"members/:projectId",element:ProjectMembers , permission:"auth",},
  {path:"invites",element:InviteListPage,permission:"auth"},
  // { path: "/project/:projectId/edit/:componentId", element: ComponentEditorSpace, permission: "auth",  },
];

export default pagesRoutes;

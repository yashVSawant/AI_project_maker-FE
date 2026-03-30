import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/auth/Login";
import Project from "../../pages/project/Project";
import AddEditProject from "../../pages/project/AddEditProject";

const pagesRoutes = [
    { path: "/dashboard", element: Dashboard ,permission:"auth" },
    { path: "/login", element: Login ,permission:"public" },
    { path: "/add/project", element: AddEditProject ,permission:"auth" ,sideBar:false },
    { path: "/project/:id", element: Project ,permission:"auth" ,sideBar:false },
    { path: "/edit/project/:editId", element: AddEditProject ,permission:"auth" ,sideBar:false },
];

export default pagesRoutes;
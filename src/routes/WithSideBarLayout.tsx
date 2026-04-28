import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const WithSideBarLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WithSideBarLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const WithoutSideBarLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header showBack={true} />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default WithoutSideBarLayout;

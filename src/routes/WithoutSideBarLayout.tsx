import { Outlet } from "react-router-dom";

const WithoutSideBarLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default WithoutSideBarLayout;

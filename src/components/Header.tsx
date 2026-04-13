import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ showBack ,isOpenRoute }: { showBack?: boolean ,isOpenRoute?:boolean }) => {
  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem("AI_PROJECT_TOKEN")
    navigate("/login")
  }
  return (
    <header className="h-[60px] shadow sticky top-0 z-50 bg-gray-700 flex items-center justify-between px-4 text-white">
      <div className="flex gap-3 items-center">
        {showBack && (
          <div
            onClick={() => navigate(-1)}
            className="px-3 py-3  rounded hover:bg-gray-300 cursor-pointer"
          >
            <ChevronLeft  className="h-6 w-6 text-white" />
          </div>
        )}
      <h1 className="font-bold text-2xl">AI Project Maker</h1>
      </div>
      <nav className="flex gap-3">
        {!isOpenRoute && <Link to="/dashboard">Dashboard</Link>}
        {!isOpenRoute && <Link to="/login" onClick={logoutHandler}>Logout</Link>}
      </nav>
    </header>
  );
};

export default Header;
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Conditions from "../pages/project/components/Conditions";
import { useState } from "react";

const Header = ({ showBack, isOpenRoute }: { showBack?: boolean; isOpenRoute?: boolean }) => {
  const navigate = useNavigate();
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem("AI_PROJECT_TOKEN");
    navigate("/login");
  };

  return (
    <header className="h-[60px] shadow sticky top-0 z-50 bg-gray-700 flex items-center justify-between px-4 text-white">
      <div className="flex gap-3 items-center">
        {showBack && (
          <div
            onClick={() => navigate(-1)}
            className="px-3 py-3  rounded hover:bg-gray-300 cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </div>
        )}
        <h1 className="font-bold text-2xl">AI Project Maker</h1>
      </div>
      <nav className="flex gap-3">
        {!isOpenRoute && <Link to="/dashboard">Dashboard</Link>}
        {!isOpenRoute && (
          <Link to="/login" onClick={logoutHandler}>
            Logout
          </Link>
        )}
        <span className="cursor-pointer" onClick={() => setIsConditionsOpen(true)}>
          Conditions
        </span>
      </nav>
      <Conditions isOpen={isConditionsOpen} onClose={() => setIsConditionsOpen(false)} />
    </header>
  );
};

export default Header;

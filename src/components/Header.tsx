import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Conditions from "../pages/project/components/Conditions";
import { useState } from "react";


const Header = ({ showBack }: { showBack?: boolean }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);



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
        
        {projectId&&<span className="cursor-pointer" onClick={() => setIsConditionsOpen(true)}>
          Conditions
        </span>}
        {projectId && <Link to={`/members/${projectId}`}>members</Link>}
      </nav>
      <Conditions isOpen={isConditionsOpen} onClose={() => setIsConditionsOpen(false)} />
    </header>
  );
};

export default Header;

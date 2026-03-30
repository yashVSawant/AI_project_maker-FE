import { useState, useRef } from "react";

const DraggableButton = ({ onClick ,Icon ,label}: { onClick: () => void; Icon?: React.ReactNode , label?:string}) => {
  

  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });

  const offset = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);

  const handleMouseDown = (e:any) => {
    dragging.current = true;

    // calculate where inside element user clicked
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

  offset.current = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    setPosition({
    x: e.clientX - offset.current.x,
    y: e.clientY - offset.current.y,
  });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  // attach listeners once
  useState(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex:100
      }} onMouseDown={handleMouseDown} className="p-3 hover:border border-blue-500 rounded-md  cursor-grab active:cursor-grabbing">
    <button
    onMouseDown={(e:any)=>e.stopPropagation()}
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 shadow-lg text-white p-4 rounded-full cursor-pointer"
    >
      {Icon && Icon}
      {label && <span className="ml-2">{label}</span>}

    </button>
    </div>
  );
};

export default DraggableButton;
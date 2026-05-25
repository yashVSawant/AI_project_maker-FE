import { useState, useRef } from "react";

const DraggableWrapper = ({ children ,positionXY = {x:10 ,y:10}}: { children: any ,positionXY?:{x:number,y:number}}) => {
  const [position, setPosition] = useState({
    x: positionXY.x,
    y: positionXY.y,
  });

  const offset = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);

  const handleMouseDown = (e: any) => {
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
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 100,
      }}
      onMouseDown={handleMouseDown}
      className="p-3 hover:border border-primary-500 bg-white rounded-md  cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;

import { useRef, useState, type JSX } from "react";

const ResizableLayout = ({
  leftComponent,
  rightComponent,
}: {
  leftComponent: JSX.Element;
  rightComponent: JSX.Element;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const [leftWidth, setLeftWidth] = useState(50); // initial %

  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;

    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current || !leftRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidthPx = e.clientX - containerRect.left;

    const min = containerRect.width * 0.2;
    const max = containerRect.width * 0.8;

    if (newWidthPx < min || newWidthPx > max) return;

    leftRef.current.style.width = `${newWidthPx}px`;
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    document.body.style.userSelect = "auto";

    // optional: sync % back to state
    if (containerRef.current && leftRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const leftPx = leftRef.current.offsetWidth;
      setLeftWidth((leftPx / containerWidth) * 100);
    }
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
    <div ref={containerRef} className="flex h-full w-full">
      {/* Left Panel */}
      <div ref={leftRef} style={{ width: `${leftWidth}%` }} className="h-full">
        {leftComponent}
      </div>

      {/* Drag Handle */}
      <div
        className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize"
        onMouseDown={handleMouseDown}
      />

      {/* Right Panel */}
      <div className="flex-1 h-full">{rightComponent}</div>
    </div>
  );
};

export default ResizableLayout;

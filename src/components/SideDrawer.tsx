type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const SideDrawer = ({ isOpen, onClose, title, children }: SideDrawerProps) => {
  return (
    <>
      {/* Drawer */}
      <div
        className={`text-black fixed rounded-l-lg bg-white top-0 right-0 h-full w-[320px] shadow-lg z-[100] transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 rounded-lg border-b border-primary bg-primary-100 flex justify-between items-center">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button className="cursor-pointer" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>

      {/* Overlay */}
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/30 z-[90]" />}
    </>
  );
};

export default SideDrawer;

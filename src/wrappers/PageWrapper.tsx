import { useNavigate } from "react-router-dom";


type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
  showBack?: boolean;
};

const PageWrapper = ({ title, children, showBack = true }: PageWrapperProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
        )}

        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
};

export default PageWrapper;
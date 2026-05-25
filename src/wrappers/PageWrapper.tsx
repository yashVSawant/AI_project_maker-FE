import { useNavigate } from "react-router-dom";
import Button, { ButtonVariant } from "../components/Button";
import { ChevronLeft } from "lucide-react";

type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
  showBack?: boolean;
};

const PageWrapper = ({ title, children, showBack = true }: PageWrapperProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 w-full h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {showBack && (
          <Button
            onClick={() => navigate(-1)}
            variant={ButtonVariant.GHOST}
            className="p-3"
          >
            <ChevronLeft className="h-4 w-4"/>
          </Button>
        )}

        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-60px)]">{children}</div>
    </div>
  );
};

export default PageWrapper;

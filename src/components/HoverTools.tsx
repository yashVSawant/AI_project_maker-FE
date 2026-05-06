import { X } from "lucide-react";
import Button, { ButtonVariant } from "./Button";

const HoverTools = ({
  
  onEdit,
  onDelete,
  onEditWithAI,
  onClose,
  onRules,
  onDescription,
  style,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onRules: () => void;
  onDescription: () => void;
  onEditWithAI: () => void;
  onClose: () => void;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      className="absolute -top-4 left-0 !z-[999] bg-black flex gap-2 text-white text-xs px-2 py-1 rounded"
      style={style}
    >
      <Button variant={ButtonVariant.GHOST} onClick={onEdit}>
        Edit
      </Button>
      <Button variant={ButtonVariant.GHOST} onClick={onEditWithAI}>
        Edit with AI
      </Button>
      <Button variant={ButtonVariant.GHOST} onClick={onRules}>
        Rules
      </Button>
      <Button variant={ButtonVariant.GHOST} onClick={onDescription}>
        Description
      </Button>
      <Button variant={ButtonVariant.GHOST} onClick={onDelete}>
        Delete
      </Button>
      <Button
        variant={ButtonVariant.GHOST}
        onClick={onClose}
        leftIcon={<X className="w-4 h-4 text-red" />}
      ></Button>
    </span>
  );
};

export default HoverTools;

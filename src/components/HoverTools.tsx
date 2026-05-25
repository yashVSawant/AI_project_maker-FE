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
  const buttonClassName = "!p-1 !text-xs"
  return (
    <span
      className="absolute -top-4 left-0 !z-[999] border bg-primary-100 border-primary flex gap-2 text-white text-xs p-2 rounded"
      style={style}
    >
      <Button variant={ButtonVariant.PRIMARY} onClick={onEdit} className={buttonClassName}>
        Edit
      </Button>
      {/* <Button variant={ButtonVariant.PRIMARY} onClick={onEditWithAI} className={buttonClassName}>
        Edit with AI
      </Button> */}
      {/* <Button variant={ButtonVariant.PRIMARY} onClick={onRules} className={buttonClassName}>
        Rules
      </Button>
      <Button variant={ButtonVariant.PRIMARY} onClick={onDescription} className={buttonClassName}>
        Description
      </Button> */}
      <Button variant={ButtonVariant.PRIMARY} onClick={onDelete} className={buttonClassName}>
        Delete
      </Button>
      <Button
        variant={ButtonVariant.SECONDARY}
        onClick={onClose}
        leftIcon={<X className="w-4 h-4 text-red" />}
        className={buttonClassName}
      ></Button>
    </span>
  );
};

export default HoverTools;

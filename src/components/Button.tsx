type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  GHOST = "ghost",
}

const variantStyles = {
  [ButtonVariant.PRIMARY]: "bg-blue-500 hover:bg-blue-600 text-white",
  [ButtonVariant.SECONDARY]: "bg-gray-200 hover:bg-gray-300 text-gray hover:text-black",
  [ButtonVariant.DANGER]: "bg-red-500 hover:bg-red-600 text-white",
  [ButtonVariant.GHOST]: "bg-transparent hover:bg-gray-100 text-gray hover:text-black",
};

const Button = ({
  children,
  onClick,
  variant = ButtonVariant.PRIMARY,
  leftIcon,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={(e)=>{
        e.stopPropagation();
        onClick && onClick(e);
      }}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        px-4 py-1 pb-2 rounded-lg text-sm font-medium
        transition duration-200 text-center leading-none
        cursor-pointer
        ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;

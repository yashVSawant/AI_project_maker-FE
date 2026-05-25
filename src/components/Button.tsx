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
  DANGER_GHOST="danger_ghost",
  HOVER_PRIMARY="hover_primary",
  HOVER_PRIMARY_BORDER="hover_primary_border"
}

const variantStyles = {
  [ButtonVariant.PRIMARY]: "bg-gradient-to-r from-primary to-primary-dark hover:opacity-80 transition-all text-black shadow-md shadow-primary-100",
  [ButtonVariant.HOVER_PRIMARY]:"border-gay-100 hover:bg-primary shadow-md shadow-primary-100",
  [ButtonVariant.HOVER_PRIMARY_BORDER]:"border-gray-100 hover:border-gray-900 hover:bg-primary-100 shadow-md shadow-primary-100 border-2 border-primary",
  [ButtonVariant.SECONDARY]: "bg-primary-100 border border-2 border-primary-500 hover:opacity-80 transition-all text-black shadow-md shadow-primary-100",
  [ButtonVariant.DANGER]: "bg-red-500 hover:bg-red-600 text-white",
  [ButtonVariant.GHOST]: "bg-gradient-to-r from-primary-100 to-primary-light hover:opacity-80 transition-all text-black shadow-md shadow-primary-100",
  [ButtonVariant.DANGER_GHOST]:"bg-gradient-to-r from-primary-light to-primary hover:bg-red-50 text-black hover:text-danger transition-all"
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
        px-4 py-2 text-center pb-3 rounded-lg text-sm font-medium
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

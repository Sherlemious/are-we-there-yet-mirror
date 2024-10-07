export default function Button({
  children,
  className,
  disabled,
  onClick,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-background-button text-text-white ${className}`}
    >
      {children}
    </button>
  );
}

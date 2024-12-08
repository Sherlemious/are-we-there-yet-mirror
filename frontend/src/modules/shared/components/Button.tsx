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
      className={`bg-accent-gold text-accent-dark-blue ${className}`}
    >
      {children}
    </button>
  );
}

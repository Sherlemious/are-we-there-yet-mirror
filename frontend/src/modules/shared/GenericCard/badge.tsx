import React from "react";

const variantStyles = {
  default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
  destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
  outline: "border border-gray-200 text-gray-900 hover:bg-gray-100",
} as const;

type BadgeProps = {
  variant?: keyof typeof variantStyles;
} & React.HTMLAttributes<HTMLDivElement>;

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };

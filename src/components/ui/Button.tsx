import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "white" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_14px_30px_-10px_oklch(56%_0.22_260/0.55)] hover:brightness-110",
  dark: "bg-[var(--foreground)] text-white hover:bg-[oklch(24%_0.04_262)] shadow-sm",
  white:
    "bg-white text-[var(--primary)] hover:bg-[oklch(97%_0.01_255)] shadow-md",
  outline:
    "border border-[var(--border-strong)] bg-[var(--surface-glass)] text-[var(--foreground)] hover:bg-white",
  ghost: "text-[var(--foreground)] hover:bg-[var(--secondary)]",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-xs font-semibold rounded-full",
  md: "h-11 px-6 text-sm font-semibold rounded-full",
  lg: "h-12 px-7 text-sm font-semibold rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

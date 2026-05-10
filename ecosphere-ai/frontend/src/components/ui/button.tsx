import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    
    // Simple basic classes to avoid needing full cn() implementation for the hackathon
    let variantClasses = "bg-green-600 text-white hover:bg-green-700"
    if (variant === "destructive") variantClasses = "bg-red-500 text-white hover:bg-red-600"
    if (variant === "outline") variantClasses = "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    
    let sizeClasses = "h-10 px-4 py-2"
    if (size === "sm") sizeClasses = "h-9 rounded-md px-3"
    if (size === "lg") sizeClasses = "h-11 rounded-md px-8"

    const combinedClassName = `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses} ${sizeClasses} ${className}`

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

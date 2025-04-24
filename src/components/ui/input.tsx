import * as React from "react";

import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel } from "./form";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, type = "text", placeholder, label, ...props }, ref) => {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
          placeholder={placeholder}
        />
      </FormControl>
    </FormItem>
  );
});

Input.displayName = "Input";

export { Input };


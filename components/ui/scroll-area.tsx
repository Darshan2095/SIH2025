import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

// Minimal ScrollArea that just constrains height and enables scrolling
export function ScrollArea({ className = "", ...props }: DivProps) {
  return <div className={`overflow-y-auto ${className}`} {...props} />;
}




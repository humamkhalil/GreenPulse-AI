"use client";

import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Pass-through provider to resolve the missing file error
  return <>{children}</>;
}

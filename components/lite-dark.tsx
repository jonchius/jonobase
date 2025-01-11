"use client"

/*
jonanity by @jonchius
/app/components/lite-dark.tsx
the next.js themes to lite/dark mode provider
*/

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
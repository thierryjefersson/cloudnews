"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering the theme toggle until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
        <div className="h-8 w-8" />
        <div className="h-8 w-12" />
        <div className="h-8 w-8" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5 rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 px-0 ${theme === "dark" ? "bg-muted" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Modo escuro</span>
      </Button>
      <div className="h-full w-0.5 bg-muted"></div>
      <Button
        variant="ghost"
        className={`h-8 px-3 text-xs ${theme === "system" ? "bg-muted" : ""}`}
        onClick={() => setTheme("system")}
      >
        Auto
      </Button>
      <div className="h-full w-0.5 bg-muted"></div>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 px-0 ${theme === "light" ? "bg-muted" : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Modo claro</span>
      </Button>
    </div>
  );
}

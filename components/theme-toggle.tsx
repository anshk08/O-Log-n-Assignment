"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative"
      >
        {theme === "dark" ? (
          <Moon className="h-[1.5rem] w-[1.5rem] text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun className="h-[1.5rem] w-[1.5rem] text-gray-700 dark:text-gray-300" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

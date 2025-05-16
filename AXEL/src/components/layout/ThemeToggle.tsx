
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`rounded-full p-2 h-9 w-9 flex items-center justify-center ${
        isDark 
          ? "border-white/20 bg-axelari-navy-light" 
          : "border-gray-200 bg-white"
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-300" />
      ) : (
        <Moon className="h-4 w-4 text-blue-500" />
      )}
      <span className="sr-only">
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </Button>
  );
}

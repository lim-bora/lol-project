"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // 마운트 확인용

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 마운트 안되면 null
    return null;
  }

  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggle;

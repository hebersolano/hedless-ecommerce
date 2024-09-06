"use client";

import { useState, useEffect, CSSProperties } from "react";
import { useTheme } from "next-themes";
import { HiOutlineSun } from "react-icons/hi2";
import { HiOutlineMoon } from "react-icons/hi2";

const ThemeToggle = ({ iconStyle }: { iconStyle: CSSProperties }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-md bg-muted p-1">
        <HiOutlineSun style={iconStyle} />
      </button>
    );
  }

  function handleTheme() {
    if (theme === "light") return setTheme("dark");
    if (theme === "dark") return setTheme("light");
  }

  return (
    <button
      className="rounded-md bg-muted p-1 hover:bg-primary hover:text-background"
      onClick={handleTheme}
    >
      {theme === "light" ? (
        <HiOutlineSun style={iconStyle} />
      ) : (
        <HiOutlineMoon style={iconStyle} />
      )}
    </button>
  );
};

export default ThemeToggle;

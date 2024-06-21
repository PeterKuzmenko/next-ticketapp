"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleMode = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = theme === "dark";

  return (
    <Button
      className="cursor-pointer hover:text-primary"
      disabled={!mounted}
      variant="outline"
      size="icon"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {mounted && <>{dark ? <Moon /> : <Sun />}</>}
    </Button>
  );
};

export default ToggleMode;

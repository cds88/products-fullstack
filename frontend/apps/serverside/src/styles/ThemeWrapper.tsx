"use client";
import React, { useMemo } from "react";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "./getTheme";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => getTheme(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}> {children}</ThemeProvider>;
};

export default ThemeWrapper;

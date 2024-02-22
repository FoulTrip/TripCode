"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { MdDarkMode, MdLightMode } from "react-icons/md";

function BtnDarkChange() {
  const [colorScheme, setColorScheme] = useState<string>("light");

  useEffect(() => {
    const savedColorScheme = Cookies.get("color-scheme");
    if (savedColorScheme) {
      setColorScheme(savedColorScheme);
    }
  }, []);

  useEffect(() => {
    if (colorScheme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
    Cookies.set("color-scheme", colorScheme, { expires: 365 * 10 });
  }, [colorScheme]);

  const handleClick = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const Icon = colorScheme === "light" ? MdDarkMode : MdLightMode;

  return (
    <>
      <div style={{ display: "grid", placeContent: "center" }}>
        <Icon onClick={handleClick} />
      </div>
    </>
  );
}

export default BtnDarkChange;

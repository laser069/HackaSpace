// src/components/ThemeSwitcher.jsx
import React from "react";

const ThemeSwitcher = ({ setDark, dark }) => {
  return (
    <button
      onClick={() => setDark(!dark)} // Toggle the dark theme
      className="p-2 rounded bg-indigo-600 text-white dark:bg-indigo-700"
    >
      Toggle {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeSwitcher;

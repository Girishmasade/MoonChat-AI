// ThemeToggle.jsx
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 rounded-lg bg-gradient-to-r 
      from-[#F5D06F] to-[#E6B85C] text-black"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
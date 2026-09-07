import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Addis Eats. Built with React &amp; Hooks Deep Dive.</p>
      <small className="footer-theme-indicator">Current Theme: {theme}</small>
    </footer>
  );
}
"use client"
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Blog", href: "#blog" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">BlogSphere</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon (mobile) */}
        <button
          className="md:hidden flex flex-col justify-between w-6  focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block  bg-gray-700 rounded transition-transform duration-300 ${
              open ? "rotate-45 translate-y-[8px]" : ""
            }`}
          ></span>
          <span
            className={`block  bg-gray-700 rounded transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block bg-gray-700 rounded transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col items-center space-y-4 py-4 font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
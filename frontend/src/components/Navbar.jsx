"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link"; // 1. Import Link for navigation
import { useAuthStore } from "@/useAuthStore"; // 2. Ensure path matches your folder

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Destructure values from your Zustand store
  const { checkAuth, logout, user, isLoading } = useAuthStore();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/" },
    { name: "Projects", href: "/" },
    { name: "Contact", href: "/" },
  ];

  useEffect(() => {

    const res =  checkAuth();
    console.log(res)

  },[checkAuth]);

  if (isLoading)
    return <div className="flex justify-center pt-20 text-4xl font-bold align-middle">Loading...</div>;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          BlogSphere
        </Link>

        {/* 2. Desktop Navigation (Center) */}
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

        {/* 3. Desktop Auth Buttons (Right Side) */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            // IF LOGGED IN
            <>
              <span className="text-gray-900 font-semibold">
                {user.name} {/* Assuming user object has 'name' property */}
              </span>
              <Link 
                href="/add-blog" 
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Add Blog
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-500 hover:text-red-600 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            // IF LOGGED OUT
            <>
              <Link href="/signIn" className="text-gray-700 hover:text-blue-600 font-medium">
                Sign In
              </Link>
              <Link 
                href="/signUp" 
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* 4. Hamburger Icon (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-full bg-gray-700 rounded transition-transform duration-300 ${
              open ? "rotate-45 translate-y-[9px]" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-700 rounded transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-700 rounded transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* 5. Mobile Menu (Dropdown) */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col items-center space-y-6 py-6 font-medium text-gray-700">
            {/* Standard Links */}
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            
            {/* Mobile Auth Links */}
            <div className="w-full border-t border-gray-200 my-2"></div>
            
            {user ? (
              <>
                <li className="text-gray-900 font-bold">{user.name}</li>
                <li>
                  <Link href="/add-blog" onClick={() => setOpen(false)} className="text-blue-600">
                    Add Blog
                  </Link>
                </li>
                <li>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-red-500">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin" onClick={() => setOpen(false)}>Sign In</Link>
                </li>
                <li>
                  <Link href="/signup" onClick={() => setOpen(false)} className="text-blue-600 font-bold">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
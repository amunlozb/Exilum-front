import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";

function AdminHeader() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 dark:bg-opacity-95 transition duration-300 ease-in-out ${
        !top &&
        "bg-white dark:bg-gray-900 backdrop-blur-sm shadow-lg dark:shadow-gray-950"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Link to X">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="36.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#CB81E6" offset="0%" />
                    <stop stopColor="#D14FAA" offset="25.871%" />
                    <stop stopColor="#721687" offset="85%" />
                  </radialGradient>
                </defs>
                <rect
                  width="45"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                {/* Remove investments from here (should only be accessible when logged in) */}
                <Link
                  to="/admin"
                  className="font-medium text-pink-600 dark:text-pink-500 hover:text-pink-900 dark:hover:text-pink-700
                px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                {/* Remove investments from here (should only be accessible when logged in) */}
                <Link
                  to="/investments"
                  className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Investments
                </Link>
              </li>
              {/*  */}

              <li className="px-3">
                <DarkThemeToggle className="focus:ring-0" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

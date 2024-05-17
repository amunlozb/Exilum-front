import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, DarkThemeToggle } from "flowbite-react";

// TODO: center collapsable items to center

function Header() {
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
      className={`fixed w-full z-30 md:bg-opacity-90 dark:bg-opacity-95 ${
        !top && "bg-white dark:bg-gray-900 backdrop-blur-sm shadow-lg dark:shadow-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <Navbar rounded className="dark:bg-gray-900">
            <Navbar.Brand as={Link} to="/">
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
            </Navbar.Brand>

            <Navbar.Toggle />
          <Navbar.Collapse>
          
                  <Navbar.Link 
                    href="/investments"
                    className=" md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out "
                  >
                    Investments
                  </Navbar.Link>

                  <Navbar.Link 
                    href="/tests"
                    className=" md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out "
                  >
                    Tests
                  </Navbar.Link>

                  <Navbar.Link
                    href="/signin"
                    className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Navbar.Link>

                  <Navbar.Link
                    href="/signup"
                    className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out flex items-center"
                  >
                    Sign up
                    <svg
                      className="w-3 h-3 fill-current text-gray-800 dark:text-gray-300 flex-shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Navbar.Link>
                <li className="px-3">
                </li>
        <DarkThemeToggle className="focus:ring-0"/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;

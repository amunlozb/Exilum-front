// Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  DarkThemeToggle,
  Dropdown,
  Avatar,
} from "flowbite-react";
import { getAuth, signOut } from "firebase/auth";

// TODO: center collapsable items to center

function Header() {
  const [top, setTop] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const role = sessionStorage.getItem("role");
        setIsAdmin(role === "ADMIN");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      sessionStorage.removeItem("role");
      // Redirect to home page
      console.log("SIGNING OUT SUCCESSFULLY");
      window.location.href = "/";
    } catch (error) {
      console.log("SIGNING OUT FAILED");
      console.log(error);
    }
  };

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
            {/* Admin links */}
            {isAdmin && (
              <>
                <Navbar.Link
                  href="/admin/dashboard"
                  className="md:text-lg text-purple-700 dark:text-purple-500 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out text-2xl"
                >
                  Dashboard
                </Navbar.Link>

                <Navbar.Link
                  href="/admin/users"
                  className="md:text-lg text-purple-700 dark:text-purple-500 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out text-2xl"
                >
                  Users
                </Navbar.Link>
              </>
            )}

            {/* Regular links */}
            <Navbar.Link
              href="/investments"
              className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out text-2xl"
            >
              Investments
            </Navbar.Link>

            <Navbar.Link
              href="/tests"
              className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                    md:px-5 md:py-3 transition duration-150 ease-in-out text-2xl"
            >
              Tests
            </Navbar.Link>

            {/* Auth links */}
            {user ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm text-gray-600 dark:text-white">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleSignOut}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <>
                <Navbar.Link
                  href="/signin"
                  className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                        md:px-5 md:py-3 transition duration-150 ease-in-out text-2xl"
                >
                  Sign in
                </Navbar.Link>

                <Navbar.Link
                  href="/signup"
                  className="md:text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500
                        md:px-5 md:py-3 transition duration-150 ease-in-out flex items-center text-2xl"
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
              </>
            )}

            <li className="px-3"></li>
            <DarkThemeToggle className="focus:ring-0" />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;
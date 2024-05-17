import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaGoogle, FaRegEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="justify-center text-center md:text-left grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="flex flex-col sm:col-span-12 lg:col-span-3">
            <div className="mb-2 self-center">
              {/* Logo */}
            <Link to="/" className="block" aria-label="Link to X">
              <svg
                className="w-auto h-8"
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
            <div className="text-sm self-center text-gray-600 dark:text-gray-400">
              <Link
                to="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
              >
                Terms
              </Link>{" "}
              ·{" "}
              <Link
                to="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 dark:text-white font-medium mb-2">
              Products
            </h6>
            <ul className="text-sm ">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Web Studio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  DynamicBox Flex
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Programming Forms
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Integrations
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Command-line
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 dark:text-white font-medium mb-2">
              Resources
            </h6>
            <ul className="text-sm ">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Documentation
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Tutorials & Guides
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Support Center
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 dark:text-white font-medium mb-2">
              Company
            </h6>
            <ul className="text-sm ">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Company values
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 dark:text-white font-medium mb-2">
              Subscribe
            </h6>
            <p className="text-sm  text-gray-600 dark:text-gray-400 mb-4">
              Get the latest news and articles sent to your inbox every month.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label
                    className="block text-sm  sr-only"
                    htmlFor="newsletter"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 dark:text-black px-3 py-2 pr-12 text-sm "
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          {/* Social links */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            
            {/* GitHub */}
            <li className="ml-4">
              <Link
                to="https://github.com/amunlozb"
                className="border-2 border-blanco rounded-full text-sm text-blanco p-3 mx-1 flex justify-center items-center text-gray-600 dark:text-gray-800 hover:text-gray-900 dark:hover:text-gray-700 bg-white hover:bg-white-100 shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <FaGithub/>
              </Link>
            </li>
            {/* LinkedIn */}
            <li className="ml-4">
              <Link
                to="https://www.linkedin.com/in/amunloz/"
                className="border-2 border-blanco rounded-full text-sm text-blanco p-3 mx-1 flex justify-center items-center text-gray-600 dark:text-gray-800 hover:text-gray-900 dark:hover:text-gray-700 bg-white hover:bg-white-100 shadow transition duration-150 ease-in-out"
                aria-label="LinkedIn"
              >
                <FaLinkedin/>
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-sm  text-gray-600 dark:text-gray-400 mr-4">
            Made by{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://github.com/amunlozb"
            >
              amunlozb
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

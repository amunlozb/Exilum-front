import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import { Flowbite, Spinner } from "flowbite-react";
import Footer from "../partials/Footer";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios';
import root_url from "../const/root_url";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSignUp = (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/weak-password") {
          setError("The password is too weak. The password should be at least 6 characters long.");
        } else if (errorCode === "auth/email-already-in-use") {
          setError("The email address is already in use by another account.");
        } else if (errorCode === "auth/invalid-email") {
          setError("The email address is invalid.");
        } else {
          setError(errorMessage);
        }
        setLoading(false); // Stop loading if there's an error
      });
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      const userToken = await user.getIdToken();
      sessionStorage.setItem("user_photoURL", user.photoURL);

      // Send POST request to endpoint
      const role = await axios.post(
        `${root_url}/api/auth/signin`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
            uid: user.uid,
          },
          withCredentials: true,
        }
      );

      sessionStorage.setItem("role", role.data[0]);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/* Site header */}
          
        <Header />

        {/* Page content */}
        <main className="flex-grow">
        {loading ? (
            <div className="flex justify-center items-center py-5 mt-52">
              <Spinner
                aria-label="Loading spinner"
                size="lg"
                color="pink"
              />
              <span className="pl-3 font-semibold text-pink-400 h4">
                Signing up...
              </span>
            </div>
          ) : (
            <section className="bg-gradient-to-b">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                  {/* Page header */}
                  <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h1 className="h1 dark:text-white">
                      Welcome. We exist to make path of exile easier.
                    </h1>
                  </div>

                  {/* Form */}
                  <div className="max-w-sm mx-auto">
                    <form onSubmit={handleSignUp}>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="email"
                            type="text"
                            className="form-input w-full text-gray-800 "
                            placeholder="Enter your email address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1"
                            htmlFor="password"
                          >
                            Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="password"
                            type="password"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && ( 
                        <div className="mb-4 text-red-600 text-center">
                          {error}
                        </div>
                      )}

                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            type="submit"
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 text-center mt-3">
                        By creating an account, you agree to the{" "}
                        <a className="underline" href="#0">
                          terms & conditions
                        </a>
                        , and our{" "}
                        <a className="underline" href="#0">
                          privacy policy
                        </a>
                        .
                      </div>
                    </form>
                    <div className="flex items-center my-6">
                      <div
                        className="border-t border-gray-300 flex-grow mr-3"
                        aria-hidden="true"
                      ></div>
                      <div className="text-gray-600 italic">Or</div>
                      <div
                        className="border-t border-gray-300 flex-grow ml-3"
                        aria-hidden="true"
                      ></div>
                    </div>

                    {/* Alternative Sign Ups */}
                    <form>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                          <button
                            className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                            onClick={handleGoogleSignUp}
                          >
                            <svg
                              className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                            </svg>
                            <span className="flex-auto pl-16 pr-8 -ml-16">
                              Continue with Google
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="text-gray-600 dark:text-gray-400 text-center mt-6">
                      Already using Exilum?{" "}
                      <Link
                        to="/signin"
                        className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default SignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "../partials/Header";
import { Flowbite } from "flowbite-react";
import Footer from "../partials/Footer";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import root_url from "../const/root_url";
import axios from "axios";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user token (to use it later in the POST request)
      const user = userCredential.user;
      const userToken = await user.getIdToken();

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

      // Redirect to home page
      console.log("SIGNING IN SUCCESSFULLY");
      window.location.href = "/";
    } catch (error) {
      console.log("SIGNING IN FAILED");
      console.log(error);
      setError("Failed to sign in. \nPlease check that the introduced email and password are correct.");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
  
    try {
      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
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
    }
  };
  
  
  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">
          <section className="bg-gradient-to-b ">
            <div className="max-w-6xl px-4 mx-auto sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Page header */}
                <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
                  <h1 className="h1 dark:text-white">
                    Welcome back. We exist to make path of exile easier.
                  </h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form onSubmit={handleSignIn}>
                    <div className="flex flex-wrap mb-4 -mx-3">
                      <div className="w-full px-3">
                        <label
                          className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full text-gray-800 form-input"
                          placeholder="Enter your email address"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-4 -mx-3">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <label
                            className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <Link
                            to="/reset-password"
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            Having trouble signing in?
                          </Link>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="w-full text-gray-800 form-input"
                          placeholder="Enter your password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-4 -mx-3">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-600 dark:text-gray-400">
                              Keep me signed in
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Error message */}
                    {error && ( 
                    <div className="mb-4 text-center text-red-600">
                      {error}
                    </div>
                  )}

                    <div className="flex flex-wrap mt-6 -mx-3">
                      <div className="w-full px-3">
                        <button className="w-full text-white bg-blue-600 btn hover:bg-blue-700">
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="flex items-center my-6">
                    <div
                      className="flex-grow mr-3 border-t border-gray-300"
                      aria-hidden="true"
                    ></div>
                    <div className="italic text-gray-600">Or</div>
                    <div
                      className="flex-grow ml-3 border-t border-gray-300"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <form>
                    {/* <div className="flex flex-wrap mb-3 -mx-3">
                      <div className="w-full px-3">
                        <button className="relative flex items-center w-full px-0 text-white bg-gray-900 btn dark:border dark:border-white hover:bg-gray-800">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mx-4 text-white opacity-75 fill-current"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                          </svg>
                          <span className="flex-auto pl-16 pr-8 -ml-16">
                            Continue with GitHub
                          </span>
                        </button>
                      </div>
                    </div> */}
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3">
                        <button
                          className="relative flex items-center w-full px-0 text-white bg-red-600 btn hover:bg-red-700"
                          onClick={handleGoogleSignIn} 
                        >
                          <svg
                            className="flex-shrink-0 w-4 h-4 mx-4 text-white opacity-75 fill-current"
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
                  <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Don’t have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 transition duration-150 ease-in-out hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default SignIn;

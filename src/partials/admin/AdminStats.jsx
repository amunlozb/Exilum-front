import React, { useState, useEffect } from "react";
import root_url from "../../const/root_url";
import axios from "axios";
import { getAuth } from "firebase/auth"; 

import Header from "../Header";
import Footer from "../Footer";
import Statistics from "./stats/Statistics";
import { Flowbite } from "flowbite-react";

function AdminStats() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const checkAdminStatus = async () => {
          try {
            const userToken = await user.getIdToken();

            const response = await axios.post(
              `${root_url}/admin/checkAdmin`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                withCredentials: true,
              }
            );

            if (response.status === 200) {
              setIsAdmin(true);
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
          } finally {
            setIsLoading(false); // Set loading to false after checking
          }
        };
        checkAdminStatus();
      } else {
        console.log("No user is signed in.");
        setIsLoading(false); // Set loading to false if no user
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <Flowbite>
        <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
          <Header />
          <main className="flex-grow flex justify-center items-center">
            <h1 className="text-5xl dark:text-white">Checking admin status...</h1> <br />
          </main>
          <Footer />
        </div>
      </Flowbite>
    );
  }

  if (!isAdmin) {
    return (
      <Flowbite>
        <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
          <Header />
          <main className="flex-grow flex justify-center items-center">
            <h1 className="text-5xl dark:text-white">Nice try :)</h1> <br />
          </main>
          <Footer />
        </div>
      </Flowbite>
    );
  }
  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">
          <Statistics />
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </Flowbite>
  );
}

export default AdminStats;

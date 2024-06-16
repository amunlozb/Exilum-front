import React, { useState, useEffect } from "react";
import root_url from "../../const/root_url";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FaExclamation } from "react-icons/fa";

import Header from "../Header";
import Footer from "../Footer";
import { Flowbite } from "flowbite-react";

function AdminData() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [uid, setUID] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [uidMessage, setUidMessage] = useState("");
  const [actionStatus, setActionStatus] = useState({}); // State to manage button text and response message

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

  const handleGrantAdminRole = async (e) => {
    e.preventDefault();
    setEmailMessage(""); // Clear previous message

    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/grantAdminByEmail?email=${email}`,
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
          setEmailMessage("Admin role granted successfully.");
        }
      }
    } catch (error) {
      console.error("Error granting admin role:", error);
      setEmailMessage("Failed to grant admin role.");
    }
  };

  const handleRevokeAdminRole = async (e) => {
    e.preventDefault();
    setEmailMessage(""); // Clear previous message

    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/revokeAdminByEmail?email=${email}`,
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
          setEmailMessage("Admin role revoked successfully.");
        }
      }
    } catch (error) {
      console.error("Error revoking admin role:", error);
      setEmailMessage("Failed to revoke admin role.");
    }
  };

  const handleGrantAdminRoleUID = async (e) => {
    e.preventDefault();
    setUidMessage(""); // Clear previous message

    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/grantAdminRole/${uid}`,
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
          setUidMessage("Admin role granted successfully.");
        }
      }
    } catch (error) {
      console.error("Error granting admin role:", error);
      setUidMessage("Failed to grant admin role.");
    }
  };

  const handleRevokeAdminRoleUID = async (e) => {
    e.preventDefault();
    setUidMessage(""); // Clear previous message

    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/revokeAdminRole/${uid}`,
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
          setUidMessage("Admin role revoked successfully.");
        }
      }
    } catch (error) {
      console.error("Error revoking admin role:", error);
      setUidMessage("Failed to revoke admin role.");
    }
  };

  const handleAction = async (endpoint, actionType) => {
    if (!window.confirm("Are you sure you want to do this? Pressing 'OK' will wipe all the values in the database and attempt to refresh them. This action cannot be undone.")) {
      return;
    }

    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        setActionStatus((prevStatus) => ({
          ...prevStatus,
          [actionType]: { loading: true, message: "" },
        }));
        const response = await axios.get(`${root_url}/admin/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });
        setActionStatus((prevStatus) => ({
          ...prevStatus,
          [actionType]: { loading: false, message: response.data },
        }));
      }
    } catch (error) {
      console.error(`Error executing ${endpoint}:`, error);
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [actionType]: { loading: false, message: "Error occurred" },
      }));
    }
  };

  if (isLoading) {
    return (
      <Flowbite>
        <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
          <Header />
          <main className="flex items-center justify-center flex-grow">
            <h1 className="text-5xl dark:text-white">
              Checking admin status...
            </h1>
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
          <main className="flex items-center justify-center flex-grow">
            <h1 className="text-5xl dark:text-white">Nice try :)</h1>
          </main>
          <Footer />
        </div>
      </Flowbite>
    );
  }

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/* Site header */}
        <Header />

        {/* Page content */}
        <main className="flex flex-col self-center justify-center p-6 mt-14">
          <h3 className="mb-10 text-center h2 dark:text-white">Admin Data</h3>
          <div className="grid gap-5 md:grid-cols-2 md:gap-32">
            <section>
              <div className="flex flex-col mb-8">
                <h4 className="text-center h4 dark:text-gray-200">
                  Admin Role Management
                </h4>
                {/* Admin Role by Email */}
                <form className="mb-4" onSubmit={handleGrantAdminRole}>
                  <label className="block mb-2 text-center dark:text-gray-300">
                    By Email
                  </label>
                  <input
                    type="email"
                    className="w-full mb-2 text-gray-800 form-input"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="w-full text-white bg-green-600 btn hover:bg-green-700">
                    Grant Admin Role
                  </button>
                </form>
                <form className="mb-4" onSubmit={handleRevokeAdminRole}>
                  <button className="w-full text-white bg-red-600 btn hover:bg-red-700">
                    Revoke Admin Role
                  </button>
                </form>
                {emailMessage && (
                  <div className="mt-4 text-center text-green-500 dark:text-green-400">
                    {emailMessage}
                  </div>
                )}
              </div>

              {/* Admin Role by UID */}
              <div className="flex flex-col mb-8">
                <form className="mb-4" onSubmit={handleGrantAdminRoleUID}>
                  <label className="block mb-2 text-center dark:text-gray-300">
                    By UID
                  </label>
                  <input
                    type="text"
                    className="w-full mb-2 text-gray-800 form-input"
                    placeholder="Enter UID"
                    value={uid}
                    onChange={(e) => setUID(e.target.value)}
                    required
                  />
                  <button className="w-full text-white bg-green-600 btn hover:bg-green-700">
                    Grant Admin Role
                  </button>
                </form>
                <form className="mb-4" onSubmit={handleRevokeAdminRoleUID}>
                  <button className="w-full text-white bg-red-600 btn hover:bg-red-700">
                    Revoke Admin Role
                  </button>
                </form>
                {uidMessage && (
                  <div className="mt-4 text-center text-green-500 dark:text-green-400">
                    {uidMessage}
                  </div>
                )}
              </div>
            </section>

            {/* Additional Management Sections */}
            <div>
              <section>
                <h4 className="mb-5 h4 dark:text-gray-200">
                  Scarab Management
                </h4>
                <button
                  className="w-full mb-2 text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() => handleAction("saveScarabs", "saveScarabs")}
                >
                  <FaExclamation className="text-xl text-red-500" />
                  {actionStatus.saveScarabs?.loading
                    ? "Saving Scarabs..."
                    : "Save Scarabs "}
                </button>
                {actionStatus.saveScarabs?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.saveScarabs.message}
                  </div>
                )}
                <button
                  className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() => handleAction("updateScarabs", "updateScarabs")}
                >
                  {actionStatus.updateScarabs?.loading
                    ? "Updating Scarabs..."
                    : "Update Scarabs"}
                </button>
                {actionStatus.updateScarabs?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.updateScarabs.message}
                  </div>
                )}
              </section>
              <section className="mt-8">
                <h4 className="mb-5 h4 dark:text-gray-200">Map Management</h4>
                <button
                  className="w-full mb-2 text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() => handleAction("saveMaps", "saveMaps")}
                >
                  <FaExclamation className="text-xl text-red-500" />

                  {actionStatus.saveMaps?.loading
                    ? "Saving Maps..."
                    : "Save Maps"}
                </button>
                {actionStatus.saveMaps?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.saveMaps.message}
                  </div>
                )}
                <button
                  className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() => handleAction("updateMaps", "updateMaps")}
                >
                  {actionStatus.updateMaps?.loading
                    ? "Updating Maps..."
                    : "Update Maps"}
                </button>
                {actionStatus.updateMaps?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.updateMaps.message}
                  </div>
                )}
              </section>
              <section className="mt-8">
                <h4 className="mb-5 h4 dark:text-gray-200">
                  Delirium Orb Management
                </h4>
                <button
                  className="w-full mb-2 text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() =>
                    handleAction("saveDeliriumOrbs", "saveDeliriumOrbs")
                  }
                >
                  <FaExclamation className="text-xl text-red-500" />

                  {actionStatus.saveDeliriumOrbs?.loading
                    ? "Saving Delirium Orbs..."
                    : "Save Delirium Orbs"}
                </button>
                {actionStatus.saveDeliriumOrbs?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.saveDeliriumOrbs.message}
                  </div>
                )}
                <button
                  className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() =>
                    handleAction("updateDeliriumOrbs", "updateDeliriumOrbs")
                  }
                >
                  {actionStatus.updateDeliriumOrbs?.loading
                    ? "Updating Delirium Orbs..."
                    : "Update Delirium Orbs"}
                </button>
                {actionStatus.updateDeliriumOrbs?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.updateDeliriumOrbs.message}
                  </div>
                )}
              </section>
              <section className="mt-8">
                <h4 className="mb-5 h4 dark:text-gray-200">
                  Crafting Material Management
                </h4>
                <button
                  className="w-full mb-2 text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() =>
                    handleAction(
                      "saveCraftingMaterials",
                      "saveCraftingMaterials"
                    )
                  }
                >
                  <FaExclamation className="text-xl text-red-500" />

                  {actionStatus.saveCraftingMaterials?.loading
                    ? "Saving Crafting Materials..."
                    : "Save Crafting Materials"}
                </button>
                {actionStatus.saveCraftingMaterials?.message && (
                  <div className="mt-2 text-center text-green-500 dark:text-green-400">
                    {actionStatus.saveCraftingMaterials.message}
                  </div>
                )}
                <button
                  className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                  onClick={() =>
                    handleAction(
                      "updateCraftingMaterials",
                      "updateCraftingMaterials"
                    )
                  }
                >
                  {actionStatus.updateCraftingMaterials?.loading
                    ? "Updating Crafting Materials..."
                    : "Update Crafting Materials"}
                </button>
                {actionStatus.updateCraftingMaterials?.message && (
                  <div className="mt-2 font-semibold text-center text-green-500 dark:text-green-400">
                    {actionStatus.updateCraftingMaterials.message}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </Flowbite>
  );
}
export default AdminData;

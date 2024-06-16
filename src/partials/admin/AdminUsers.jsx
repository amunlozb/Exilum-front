import React, { useState, useEffect } from "react";
import root_url from "../../const/root_url";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Header from "../Header";
import Footer from "../Footer";
import { Flowbite } from "flowbite-react";

function AdminUsers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Track user being edited
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  // Fetch user data function
  const fetchUserData = async () => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.get(`${root_url}/admin/users/list`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check admin status on component mount
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
              fetchUserData();
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
          } finally {
            setIsLoading(false);
          }
        };
        checkAdminStatus();
      } else {
        console.log("No user is signed in.");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle creating a new user
  const handleCreateUser = async () => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/users`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("User created successfully");
          fetchUserData(); // Refresh user list after creation
          // Clear form inputs
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    handleCreateUser();
  };

  // Handle updating user
  const handleUpdateUser = (user) => {
    setEditingUser(user); // Set user being edited
    setIsEditing(true); // Show edit form
  };

  // Handle update form submission
  const handleUpdateFormSubmit = async () => {
    try {
      const user = getAuth().currentUser;
      if (user && editingUser) {
        const userToken = await user.getIdToken();
        const response = await axios.post(
          `${root_url}/admin/users/update`,
          {
            uid: editingUser.uid,
            email: editingUser.email,
            password: editingUser.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("User updated successfully");
          fetchUserData(); // Refresh user list after update
          setIsEditing(false); // Hide edit form
          setEditingUser(null); // Clear editingUser state
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle deleting user
  const handleDeleteUser = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userToken = await user.getIdToken();
        const response = await axios.delete(`${root_url}/admin/users/${uid}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("User deleted successfully");
          fetchUserData(); // Refresh user list after deletion
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // If loading, show loading message
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

  // If not admin, show unauthorized message
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

  // Render admin interface with user list and create user form
  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        <Header />
        <main className="flex-grow">
          <h3 className="mt-10 mb-5 text-center text-white h3">Admin Users</h3>

          {/* Create User Form */}
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-5">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </form>

          {/* User Table */}
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full overflow-hidden bg-white shadow-md dark:bg-gray-900 rounded-xl">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-200">
                    UID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-200">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <React.Fragment key={user.uid}>
                    {isEditing &&
                    editingUser &&
                    editingUser.uid === user.uid ? (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {user.uid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                email: e.target.value,
                              })
                            }
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter new email"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="password"
                            value={editingUser.password}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                password: e.target.value,
                              })
                            }
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter new password"
                          />
                        </td>
                        <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleUpdateFormSubmit()}
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-2 py-1 text-xs text-white bg-gray-500 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {user.uid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleUpdateUser(user)}
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.uid)}
                            className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default AdminUsers;


import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

export default async function isAdmin() {
  try {
    const user = getAuth().currentUser;

    if (!user) {
      return "No user is logged in.";
    }

    const token = await user.getIdToken();

    const response = await fetch('http://localhost:8080/api/getAuthorities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(token);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return false;
    }

    const data = await response.json();
    console.log(data);

    const isAdmin = data.some(obj => obj.authority === 'ADMIN');
    return isAdmin;
  } catch (error) {
    console.error("An error occurred while checking admin status:", error);
    return false;
  }
}

import React from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import root_url from "../../const/root_url";

function TestContent() {
    const fetchEndpoint = async (url) => {
        try {
            const response = await fetch(`${root_url}${url}`, { credentials: "include" });
            console.log(response);
            const data = await response;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFetchPublic = () => {
        fetchEndpoint("/api/test/public");
    };

    const handleFetchAuthenticated = () => {
        fetchEndpoint("/api/test/authenticated");
    };

    const handleFetchAdmin = () => {
        fetchEndpoint("/api/test/admin");
    };

    const handleFetchLogout = async () => {
        const user = getAuth().currentUser;
        const uid = user.uid;

        try {
            await axios.post(
                "/api/auth/signout",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": await user.getIdToken(),
                        "uid": uid,
                    },
                }
            );

            sessionStorage.removeItem("role");
            window.location.reload();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex gap-4 justify-center mt-40">
            <button className="bg-green-400" onClick={handleFetchPublic}>Fetch Public Endpoint</button>
            <button className="bg-green-400" onClick={handleFetchAuthenticated}>Fetch Authenticated Endpoint</button>
            <button className="bg-green-400" onClick={handleFetchAdmin}>Fetch Admin Endpoint</button>
            <button className="bg-green-400" onClick={handleFetchLogout}>Logout</button>
        </div>
    );
}

export default TestContent;

import React from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import root_url from "../../const/root_url";

function TestContent() {
    const fetchEndpoint = async (url) => {
        try {
            const user = getAuth().currentUser;
            const headers = {};

            if (user) {
                const userToken = await user.getIdToken();
                headers["Authorization"] = `Bearer ${userToken}`;
            }

            const response = await fetch(`${root_url}${url}`, {
                credentials: "include",
                headers: headers,
            });

            console.log(response);
            return response;
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

    return (
        <div className="flex gap-4 justify-center mt-40">
            <button className="bg-green-400" onClick={handleFetchPublic}>Fetch Public Endpoint</button>
            <button className="bg-green-400" onClick={handleFetchAuthenticated}>Fetch Authenticated Endpoint</button>
            <button className="bg-green-400" onClick={handleFetchAdmin}>Fetch Admin Endpoint</button>
        </div>
    );
}

export default TestContent;

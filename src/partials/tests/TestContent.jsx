import React from "react";

function TestContent() {
    const fetchEndpoint = async (url) => {
        try {
            const response = await fetch(url, { credentials: "include" });
            console.log(response);
            const data = await response;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFetchPublic = () => {
        fetchEndpoint("http://localhost:8080/api/test/public");
    };

    const handleFetchAuthenticated = () => {
        fetchEndpoint("http://localhost:8080/api/test/authenticated");
    };

    const handleFetchAdmin = () => {
        fetchEndpoint("http://localhost:8080/api/test/admin");
    };

    const handleFetchLogout = () => {
        fetchEndpoint("http://localhost:8080/api/auth/sessionLogout");
    }

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

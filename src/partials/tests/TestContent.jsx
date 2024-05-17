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

    return (
        <div className="bg-red-500 flex justify-center mt-40">
            <button onClick={handleFetchPublic}>Fetch Public Endpoint</button>
            <button onClick={handleFetchAuthenticated}>Fetch Authenticated Endpoint</button>
            <button onClick={handleFetchAdmin}>Fetch Admin Endpoint</button>
        </div>
    );
}

export default TestContent;

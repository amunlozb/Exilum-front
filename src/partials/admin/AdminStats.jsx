import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import Statistics from "./stats/Statistics";
import { Flowbite } from "flowbite-react";

function AdminStats() {

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
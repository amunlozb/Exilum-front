import React from "react";

import AdminHeader from "../partials/admin/AdminHeader";
import FeaturesHome from "../partials/home/Features";
import FeaturesBlocks from "../partials/home/FeaturesBlocks";

import Footer from "../partials/Footer";
import { Flowbite } from "flowbite-react";

function Admin() {
    return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
    <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <AdminHeader />

        {/*  Page content */}
        <main className="flex-grow">
          {/*  Page sections */}
        {/* <HeroHome /> */}
        <FeaturesHome />
        </main>

        {/*  Site footer */}
        <Footer />
    </div>
    </Flowbite>
);
}

export default Admin;

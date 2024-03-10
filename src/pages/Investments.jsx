import React from 'react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import {Flowbite } from 'flowbite-react';

function Home() {
    return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
        <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">
          {/*  Page sections */}

        </main>

        {/*  Site footer */}
        <Footer />
        </div>
    </Flowbite>
    );
}

export default Home;

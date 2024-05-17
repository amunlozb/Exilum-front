import React, { useState, useEffect } from 'react';
import Header from '../partials/Header';
import TestContent from '../partials/tests/TestContent';
import Footer from '../partials/Footer';
import { Flowbite } from 'flowbite-react';

function Tests() {

  return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Render the appropriate header based on the user's role */}
        {/* {isAdmin ? <Header /> : <AdminHeader />} */}
        <Header />
        {/*  Page content */}
        <main className="flex-grow">
          {/*  Page sections */}
          <TestContent/>
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Tests;
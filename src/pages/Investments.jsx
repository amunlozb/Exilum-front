import React from 'react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { Flowbite } from 'flowbite-react';

import InvestmentGroup from '../partials/InvestmentGroup';
import Newsletter from '../partials/Newsletter';

function Investments() {
    return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
        <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">
          {/*  Page sections */}
          <InvestmentGroup title={'This is a title'} hasSearch={true} />
          <Newsletter />
        </main>

        {/*  Site footer */}
        <Footer />
        </div>
    </Flowbite>
    );
}

export default Investments;

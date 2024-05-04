import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/home/HeroHome';
import FeaturesHome from '../partials/home/Features';
import FeaturesBlocks from '../partials/home/FeaturesBlocks';
import Testimonials from '../partials/home/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';
import { Flowbite } from 'flowbite-react';


import { auth } from "../firebase";


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
          <HeroHome />
          <FeaturesHome />
          <FeaturesBlocks />
          <Testimonials />
          <Newsletter />
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Home;
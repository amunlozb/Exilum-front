import React from 'react';

import { Flowbite } from 'flowbite-react';

import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Newsletter from '../partials/Newsletter';

import InvestmentGroup from '../partials/investments/InvestmentGroup';

function Investments() {

  const sampleContent = [
    { alt: "Image 1", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 2", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 3", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
    { alt: "Image 4", imageSrc: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png" },
  ];

  return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header/>

        {/*  Page content */}
        <main className="flex flex-col mt-20 gap-10 items-center text-center"> {/* Add text-center class */}
          {/*  Page sections */}          <InvestmentGroup
        title="This is a title"
        hasSearch={true}
        content={sampleContent}
      />
          <Newsletter />
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Investments;

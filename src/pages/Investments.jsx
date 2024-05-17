import React from "react";

import { Flowbite } from "flowbite-react";

import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Newsletter from "../partials/Newsletter";

import SelectableInvestmentGroup from "../partials/investments/SelectableInvestmentGroup";
import OptionInvestmentGroup from "../partials/investments/OptionInvestmentGroup";

function Investments() {
  const sampleContent = [
    {
      alt: "Image 1",
      imageSrc:
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png",
    },
    {
      alt: "Image 2",
      imageSrc:
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png",
    },
    {
      alt: "Image 3",
      imageSrc:
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png",
    },
    {
      alt: "Image 4",
      imageSrc:
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxNYWdpYyIsInNjYWxlIjoxfV0/6308fc8ca2/CurrencyRerollMagic.png",
    }
    
  ];

  const content2 = [{name: "Harbinger", description: "Map contains 2 additional Harbingers", price: 6}, {name: "Breach", description: "Map contains an additional Breach", price: 6}, {name: "Delirium", description: "Map contains an additional Delirium Mirror", price: 6}]

  return (
    // Wrap everything in Flowbite so dark mode works
    <Flowbite>
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-gray-900">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex flex-col my-36 gap-10 items-center text-center">
          {/*  Page sections */}{" "}
          <SelectableInvestmentGroup
            title="Scarabs"
            hasSearch={true}
            content={sampleContent}
            limit={4}
          />
          <SelectableInvestmentGroup
            title="Delirium Orbs"
            hasSearch={true}
            content={sampleContent}
            limit={6}
          />
          <OptionInvestmentGroup
            title="Map Device Craft"
            hasSearch={true}
            content={content2}
            limit={1}/>
          {/* Calculate Button */}
          <a
            className="btn text-white bg-pink-700 hover:bg-pink-800 shadow-xl select-none pointer-events-auto text-2xl font-bold"
            href="/"
          >
            Calculate
          </a>
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </Flowbite>
  );
}

export default Investments;

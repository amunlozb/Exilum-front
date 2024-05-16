import React, { useState, useRef, useEffect } from "react";
import { Button } from "flowbite-react";
import pantheon from "../../images/pantheon.png";

function HeroHome() {
  
  return (
    <section className="relative">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="dark:text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Welcome to <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
                Exilum
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 dark:text-gray-400 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                The tool that will make everything easier by helping you
                calculate the profit for your Path of Exile farming strategy.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center gap-4"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Button gradientDuoTone="purpleToPink" size="lg" href="/signup">
                    Try it now for free
                  </Button>
                </div>
                <div>
                  <Button gradientDuoTone="purpleToPink" outline size="lg" href="https://github.com/amunlozb/Exilum-front">
                    Github Repo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}

          <div
            className="relative flex justify-center mb-8"
            data-aos="zoom-y-out"
            data-aos-delay="250"
            data-aos-offset="400"
          >
            <div className="flex flex-col justify-center opacity-80 dark:opacity-40 py-30">
              <img
                className="mx-auto"
                src={pantheon}
                width="468"
                height="232"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;

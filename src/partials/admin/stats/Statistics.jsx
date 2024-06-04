// Statistics.jsx

import React, { useEffect, useRef } from 'react';

import LeadsStatistics from './LeadStatistics';
import UserStatistics from './UserStatistics';

function Statistics() {

    return (
        <section className="relative">
            {/* Section background (needs .relative class on parent and next sibling elements) */}
            <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 dark:bg-gray-800 transform translate-y-1/2"></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mb-20">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h2 className="h2 mb-4 dark:text-white">
                            Welcome to the{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
                                Admin Dashboard
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Here you will be able to view usage statistics from all the different sections of the website, and the strategies made by users.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="flex justify-center">
                    <LeadsStatistics />
                    <UserStatistics />
          </div>
          </div>
          </div>
        </section>
    );
}

export default Statistics;
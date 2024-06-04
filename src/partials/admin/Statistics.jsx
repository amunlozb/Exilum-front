// Statistics.jsx

import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'

function Statistics() {
    const chartRef = useRef(null);

    useEffect(() => {
      const options = {
        chart: {
          height: "100%",
          maxWidth: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: { left: 2, right: 2, top: 0 },
        },
        series: [
          {
            name: "New users",
            data: [6500, 6418, 6456, 6526, 6356, 6456],
            color: "#1A56DB",
          },
        ],
        xaxis: {
          categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      };
  
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
  
      // Clean up the chart instance when the component unmounts
      return () => {
        chart.destroy();
      };
    }, []); // Empty dependency array means this effect runs once after the component mounts

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
                    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div className="flex justify-between">
            <div>
              <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                32.4k
              </h5>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Users this week
              </p>
            </div>
            <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
              12%
              <svg
                className="w-3 h-3 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
            </div>
          </div>
          <div id="area-chart" ref={chartRef}></div> {/* Pass ref to the chart container */}
          {/* ... (rest of your chart HTML) */}
        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
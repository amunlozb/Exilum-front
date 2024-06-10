import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

function UserStatistics() {
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
        categories: ['13 June', '14 June', '15 June', '16 June', '17 June', '18 June', '19 June'],
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

    return () => {
      chart.destroy(); 
    };
  }, []); 

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg dark:bg-gray-900 p-4 md:p-6 dark:shadow-black">
      <div id="area-chart" ref={chartRef} /> 
      </div>
  );
}

export default UserStatistics;
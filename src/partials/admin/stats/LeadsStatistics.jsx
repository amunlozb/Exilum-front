import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

function LeadsStatistics({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const options = {
      colors: ['#1A56DB', '#FDBA8C'],
      series: [
        {
          name: 'Strategies',
          color: '#FDBA8C',
          data: data,
        },
      ],
      chart: {
        type: 'bar',
        height: '320px',
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ['transparent'],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
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
      fill: {
        opacity: 1,
      },
    };

    if (!chartInstance.current) {
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    } else {
      chartInstance.current.updateOptions(options);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg dark:bg-gray-900 md:p-6 dark:shadow-black">
      <h2 className='text-center h3'>Strategies Created</h2>
      <div id="column-chart" ref={chartRef} />
    </div>
  );
}

export default LeadsStatistics;

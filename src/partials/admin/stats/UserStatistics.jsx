import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

function UserStatistics({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const options = {
      chart: {
        height: '100%',
        maxWidth: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2'],
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
          name: 'New users',
          data: data,
          color: '#1A56DB',
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
      <h2 className='text-center h3'>New Users</h2>
      <div id="area-chart" ref={chartRef} />
    </div>
  );
}

export default UserStatistics;

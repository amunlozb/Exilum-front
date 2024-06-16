import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import root_url from '../../../const/root_url';

import LeadsStatistics from './LeadsStatistics';
import UserStatistics from './UserStatistics';

function Statistics() {
  const [leadsData, setLeadsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        const userToken = await user.getIdToken();
        const leadsResponse = await axios.get(`${root_url}/admin/chartTwoData`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });

        const usersResponse = await axios.get(`${root_url}/admin/chartOneData`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });

        setLeadsData(leadsResponse.data);
        setUsersData(usersResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="relative">
      <div className="absolute bottom-0 left-0 right-0 w-px h-20 p-px m-auto transform translate-y-1/2 bg-gray-200 dark:bg-gray-800"></div>

      <div className="relative max-w-6xl px-4 mx-auto mb-20 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <h2 className="mb-4 h2 dark:text-white">
              Welcome to the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400">
                Admin Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Here you will be able to view usage statistics from all the different sections of the website, and the strategies made by users.
            </p>
          </div>

          <div className="flex justify-center gap-10">
            <LeadsStatistics data={leadsData} />
            <UserStatistics data={usersData} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
// ... other imports

function SharedSummary() {
  const { uuid } = useParams();
  const [prices, setPrices] = useState(null); 

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const response = await axios.get(`${root_url}/api/share/${uuid}`);
        setPrices(response.data); 
      } catch (error) {
        console.error("Error fetching shared data:", error);
        // Handle error (e.g., redirect to error page or display message)
      }
    };

    fetchSharedData();
  }, [uuid]); // Fetch data when uuid changes

  // ... Rest of your component to display the summary table using the 'prices' state 
  //     This will be similar to your existing Summary component logic
}

export default SharedSummary;
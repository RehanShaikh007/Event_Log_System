import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LogDashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],  
    datasets: []
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/logs/dashboard');
        console.log('API Response:', response.data);
    
        // Ensure the response data is an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Map over the logs to create chart labels and data
          const labels = response.data.map(log => log._id); // Date (_id)
          const data = response.data.map(log => log.count); // Event count
    
          setChartData({
            labels,
            datasets: [{
              label: 'Event Logs Over Time',
              data,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            }],
          });
        } else {
          console.warn('No data to display or invalid response format');
          setChartData({
            labels: [],
            datasets: []
          });
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
        setChartData({ labels: [], datasets: [] });
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Log Dashboard</h2>
      <div className="mb-4">
   
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default LogDashboard;

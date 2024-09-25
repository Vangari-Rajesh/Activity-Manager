import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';

const OverallActivitiesPieChart = () => {
    const [activityData, setActivityData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://activity-manager-backend-sigma.vercel.app/api/activities');
                const data = response.data;
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading status to false after fetching data
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!activityData) return;

        const calculateCounts = () => {
            const { activities } = activityData;
            const today = new Date();
            let completedCount = 0;
            let cancelledCount = 0;
            let inProgressCount = 0;
            let pendingCount = 0;

            activities.forEach(activity => {
                const deadline = new Date(activity.deadline);
                if (activity.progress === 'Completed') {
                  completedCount++;
                } else if (activity.progress === 'Cancelled') {
                  cancelledCount++;
                } else if (deadline < today) {
                  pendingCount++;
                } else {
                    inProgressCount++;
                }
            });

            return [completedCount, cancelledCount, inProgressCount, pendingCount];
        };

        const ctx = document.getElementById('activitiesPieChart');

        const [completedCount, cancelledCount, inProgressCount, pendingCount] = calculateCounts();

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy the existing chart instance
        }

        const newChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Completed', 'Cancelled', 'In Progress', 'Pending'],
                datasets: [{
                    data: [completedCount, cancelledCount, inProgressCount, pendingCount],
                    backgroundColor: ['#00FF00', '#FF0000', '#87CEEB', '#FFA500'],
                }],
            },
            options: {
                title: {
                    display: true,
                    text: 'Overall Activities Pie Chart',
                },
                responsive: true, // Make the chart responsive
                maintainAspectRatio: false, // Allow the chart to adjust its aspect ratio
            },
        });

        chartInstanceRef.current = newChartInstance;
    }, [activityData]);

    return (
        <div>
            <Navbar />
            {isLoading ? (
                <p>Loading...</p>
            )  : (
                <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
                    <canvas id="activitiesPieChart" width="600" height="600"></canvas>
                </div>
            )}
        </div>
    );
};

export default OverallActivitiesPieChart;

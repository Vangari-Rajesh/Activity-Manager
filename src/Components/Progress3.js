import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';

const OverallActivitiesBarGraph = () => {
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://activity-manager-backend-sigma.vercel.app/api/activities');
                setActivityData(response.data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!activityData) return;

        const counts = {
            completed: 0,
            cancelled: 0,
            inProgress: 0,
            pending: 0,
        };

        activityData.activities.forEach(activity => {
            if (activity.progress === 'Completed') {
                counts.completed++;
            } else if (activity.progress === 'Cancelled') {
                counts.cancelled++;
            } else {
                const deadline = new Date(activity.deadline);
                if (deadline < new Date()) {
                    counts.pending++;
                } else {
                    counts.inProgress++;
                }
            }
        });

        const ctx = document.getElementById('activitiesBarGraph');

        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing chart instance
        }

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Completed', 'Cancelled', 'In Progress', 'Pending'],
                datasets: [{
                    label: 'Activity Count',
                    data: [counts.completed, counts.cancelled, counts.inProgress, counts.pending],
                    backgroundColor: ['#00FF00', '#FF0000', '#87CEEB', '#FFA500'],
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Activity Count',
                        },
                    },
                },
            },
        });
    }, [activityData]);

    return (
        <div>
            <Navbar />
            {loading ? ( // Render loading message while fetching data
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading...</p>
                </div>
            ) : (
                <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
                    <canvas id="activitiesBarGraph" width="600" height="600"></canvas>
                </div>
            )}
        </div>
    );
};

export default OverallActivitiesBarGraph;

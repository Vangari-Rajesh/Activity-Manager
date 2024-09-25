import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';

const DateWiseActivitiesBarGraph = () => {
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
    const chartRef = useRef(null);

    useEffect(() => {
        fetchData(selectedDate); // Fetch data when component mounts
    }, [selectedDate]);

    useEffect(() => {
        if (!activityData) return;

        const counts = {
            completed: 0,
            cancelled: 0,
            inProgress: 0,
            pending: 0,
        };

        activityData.activities.forEach(activity => {
            const submissionDate = new Date(activity.createdAt);
            if (!isNaN(submissionDate.getTime())) {
                const submissionDateFormatted = submissionDate.toISOString().split('T')[0];
                if (submissionDateFormatted === selectedDate) {
                    if (activity.progress === 'Completed') {
                        counts.completed++;
                    } else if (activity.progress === 'Cancelled') {
                        counts.cancelled++;
                    } else{
                        const deadline = new Date(activity.deadline);
                        if (deadline < new Date()) {
                            counts.pending++;
                        } else {
                            counts.inProgress++;
                        }
                    }
                }
            }
        });

        const ctx = document.getElementById('activitiesBarGraph');

        if (chartRef.current) {
            chartRef.current.destroy();
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
    }, [activityData, selectedDate]);

    const fetchData = async (date) => {
        try {
            const response = await axios.get(`https://activity-manager-backend-sigma.vercel.app/api/activities?date=${date}`);
            setActivityData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // const handleSubmit = () => {
    //     setLoading(true);
    //     fetchData(selectedDate); // Fetch data when submit button is clicked
    // };

    return (
        <div>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <input type="date" value={selectedDate} onChange={handleDateChange} />
                {/* <button onClick={handleSubmit}>Submit</button> */}
            </div>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading...</p>
                </div>
            ) : (
                <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
                    <canvas id="activitiesBarGraph" width="400" height="400"></canvas>
                </div>
            )}
        </div>
    );
};

export default DateWiseActivitiesBarGraph;

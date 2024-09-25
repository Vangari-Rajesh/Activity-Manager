import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('https://activity-manager-backend-sigma.vercel.app/api/activities');
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleActionChange = async (activityId, action) => {
    try {
      const response = await fetch(`https://activity-manager-backend-sigma.vercel.app/api/activities/${activityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });
      if (!response.ok) {
        throw new Error('Failed to update activity status');
      }
      // Update the activities list after action change
      fetchActivities();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const getStatusColor = (activity) => {
    const currentDate = new Date();
    const deadlineDate = new Date(activity.deadline);
    const progress = activity.progress;
    if (progress === 'Completed') {
      return { text: 'Completed', color: 'success' };
    } else if (progress === 'Cancelled') {
      return { text: 'Cancelled', color: 'danger' };
    } else if (currentDate <= deadlineDate) {
      return { text: 'In Progress', color: 'info' };
    } else {
      return { text: 'Pending', color: 'warning' };
    }
  };

  return (
    <div>
      <Navbar />
      <div className='m-3'>
      <h2>All Activities</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date Of Submission</th>
            <th>Activity Name</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}>
              <td>{new Date(activity.createdAt).toLocaleDateString()}</td>
              <td>{activity.activity}</td>
              <td>{new Date(activity.deadline).toLocaleDateString()}</td>
              <td>
                <span className={`badge bg-${getStatusColor(activity).color}`}>
                  {getStatusColor(activity).text}
                </span>
              </td>
              <td>
                {activity.progress !== 'Completed' && activity.progress !== 'Cancelled' &&
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdown-${activity._id}`} data-bs-toggle="dropdown" aria-expanded="false">
                      Select
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdown-${activity._id}`}>
                      <li><button className="dropdown-item" onClick={() => handleActionChange(activity._id, 'completed')}>Completed</button></li>
                      <li><button className="dropdown-item" onClick={() => handleActionChange(activity._id, 'cancel')}>Cancel</button></li>
                    </ul>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Activity;

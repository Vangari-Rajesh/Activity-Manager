import React, { useState } from 'react';
import Navbar from './Navbar';

const NewActivityForm = ({ onSubmit }) => {
  const [activity, setActivity] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send form data to backend
      const response = await fetch('https://activity-manager-backend-sigma.vercel.app/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activity, deadline })
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Reset the form fields
      setActivity('');
      setDeadline('');
      setMessage('Activity saved successfully');
      setError('');
      
      // Call onSubmit callback if provided
      if (typeof onSubmit === 'function') {
        onSubmit();
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('');
      setError('Failed to save activity (can\'t place deadline of past days)');
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="activityInput" className="form-label">Activity</label>
                <input
                  type="text"
                  className="form-control"
                  id="activityInput"
                  placeholder="Enter activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deadlineInput" className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  id="deadlineInput"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewActivityForm;

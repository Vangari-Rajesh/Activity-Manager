import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1>Welcome to Activity Manager</h1>
            <div className='mt-5'>
            <p>
              Activity Manager is a powerful tool designed to help you organize and track your activities effectively. Whether you're managing personal tasks, work projects, or team activities, Activity Manager provides the features you need to stay on top of your workload.
            </p>
            <p>
              With Activity Manager, you can easily add new activities, set deadlines, categorize tasks, monitor progress, and view detailed reports. Say goodbye to the hassle of juggling multiple to-do lists and calendars – Activity Manager streamlines your workflow, allowing you to focus on what matters most.
            </p>
            <p>
              Get started today and experience the convenience of managing your activities with Activity Manager.
            </p>
            </div>
          </div>
          <div className="col-md-6">
            <img src="https://clipartix.com/wp-content/uploads/2018/03/checklist-clipart-2018-53.png" alt="Activity Manager" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const Landing = () => {
  return (
    <div className="bg-info text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3">Welcome to the Task Manager</h1>
        {/* Use Link to navigate to the TaskManager page */}
        <Link to="/taskmanager">
          <button className="btn btn-lg btn-light text-info">Manage Your Tasks</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;

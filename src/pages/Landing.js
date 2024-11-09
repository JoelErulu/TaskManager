import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';  // Add custom global CSS if needed

const Landing = () => {
  const history = useHistory(); 

  const handleButtonClick = () => {
    history.push('/taskmanager');
  };

  return (
    <div className="landing-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-2 mb-4 font-weight-bold">Welcome to Task Manager</h1>
        <p className="lead mb-5">Organize, track, and manage tasks effortlessly</p>
        <button className="btn btn-lg custom-btn" onClick={handleButtonClick}>
          Go to Task Manager
        </button>
      </div>
    </div>
  );
};

export default Landing;

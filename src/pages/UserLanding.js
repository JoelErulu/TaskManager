import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for programmatic navigation
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '../global.css';

const Landing = () => {
  const history = useHistory(); 

  const handleButtonClick = () => {
    history.push('/taskmanager');
  };

  return (
    <div className="bg-white text-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3">Welcome to the Task Manager</h1>
        <button className="btn custom-btn" onClick={handleButtonClick}>
          Manage Your Tasks
        </button>
      </div>
    </div>
  );
};

export default Landing;

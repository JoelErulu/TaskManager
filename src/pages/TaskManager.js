import React from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

function TaskManager() {
  const history = useHistory();  

  const navigateToCreateTask = () => {
    history.push('/create-task');
  };

  const navigateToViewTask = () => {
    history.push('/view-task');
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-3 mb-4">Task Manager</h1>
        <div className="d-grid gap-3 col-6 mx-auto">
          <button className="btn custom-btn btn-lg" onClick={navigateToCreateTask}>
            Create Task
          </button>
          <button className="btn custom-btn btn-lg" onClick={navigateToViewTask}>
            View Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;

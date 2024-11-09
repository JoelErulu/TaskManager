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
        <div className="d-grid gap-4 col-6 mx-auto">
          <button className="btn custom-btn btn-lg" onClick={navigateToCreateTask}>
            Create Task
          </button>
          <p className="mt-2 text-muted">Click to create a new task.</p>

          <button className="btn custom-btn btn-lg" onClick={navigateToViewTask}>
            View Tasks
          </button>
          <p className="mt-2 text-muted">Click to view and manage your existing tasks.</p>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;

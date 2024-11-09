import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';  // Custom CSS for additional styles

function TaskManager() {
  const history = useHistory();  

  const navigateToCreateTask = () => {
    history.push('/create-task');
  };

  const navigateToViewTask = () => {
    history.push('/view-task');
  };

  const navigateToCompletedTasks = () => {
    history.push('/completed-tasks');
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-5" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center">
          <h1 className="display-4 mb-4">Task Manager</h1>
          <p className="text-muted mb-4">Organize and track your tasks with ease.</p>
          <div className="d-grid gap-3">
            <button className="btn btn-primary btn-lg shadow-sm custom-btn" onClick={navigateToCreateTask}>
              Create Task
            </button>
            <button className="btn btn-secondary btn-lg shadow-sm custom-btn" onClick={navigateToViewTask}>
              View Tasks
            </button>
            <button className="btn btn-success btn-lg shadow-sm custom-btn" onClick={navigateToCompletedTasks}>
              Completed Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;

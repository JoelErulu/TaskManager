import React from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation

function TaskManager() {
  const history = useHistory();  // Initialize useHistory to handle navigation

  // Navigate to CreateTask page when the button is clicked
  const navigateToCreateTask = () => {
    history.push('/create-task');
  };

  return (
    <div>
      <button onClick={navigateToCreateTask}>Create Task</button>
      <button>View Tasks</button>
    </div>
  );
}

export default TaskManager;

import React from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation

function TaskManager() {
  const history = useHistory();  

  const navigateToCreateTask = () => {
    history.push('/create-task');
  };

  
  const navigateToCViewTask = () => {
    history.push('/view-task');
  };

  return (
    <div>
      <button onClick={navigateToCreateTask}>Create Task</button>
      <button onClick={navigateToCViewTask}>View Tasks</button>
    </div>
  );
}

export default TaskManager;

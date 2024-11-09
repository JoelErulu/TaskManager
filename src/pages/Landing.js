import React from 'react';
import { useHistory } from 'react-router-dom';

function Landing() {
  const history = useHistory();

  const goToTaskManager = () => {
    history.push('/taskmanager');
  };

  return (
    <div>
      <button onClick={goToTaskManager}>Task Manager</button>
    </div>
  );
}

export default Landing;

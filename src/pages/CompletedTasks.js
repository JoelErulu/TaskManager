import React, { useEffect, useState } from 'react';
import { getCompletedTasks, deleteCompletedTask } from '../firebase/firebaseUtils';  // Import necessary functions
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const result = await getCompletedTasks();
      if (result.success) {
        setCompletedTasks(result.tasks);
      } else {
        console.error('Error fetching completed tasks: ', result.error);
      }
      setLoading(false);
    };

    fetchCompletedTasks();
  }, []);

  const handleDeleteCompletedTask = async (taskId) => {
    setLoading(true);
    const result = await deleteCompletedTask(taskId);
    if (result.success) {
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId)); // Remove task from local state
    } else {
      console.error('Error deleting completed task');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Completed Tasks</h2>
      {loading ? (
        <p>Loading completed tasks...</p>
      ) : completedTasks.length === 0 ? (
        <p>No completed tasks available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.completedAt).toLocaleString()}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;

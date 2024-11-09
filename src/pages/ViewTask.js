import React, { useEffect, useState } from 'react';
import { getTasks, modifyTask, deleteTask } from '../firebase/firebaseUtils';  // Import deleteTask function
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTaskData, setUpdatedTaskData] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTasks();
      if (result.success) {
        setTasks(result.tasks); 
      } else {
        console.error('Error fetching tasks: ', result.error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleEditClick = (taskId, task) => {
    setEditingTaskId(taskId);
    setUpdatedTaskData({ title: task.title, description: task.description }); 
  };

  const handleUpdateTask = async (taskId) => {
    setLoading(true);
    const result = await modifyTask(taskId, updatedTaskData);
    if (result.success) {
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTaskData } : task)));
      setEditingTaskId(null);
    } else {
      console.error('Error updating task');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTaskData({ ...updatedTaskData, [name]: value });
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    const result = await deleteTask(taskId);
    if (result.success) {
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from local state
    } else {
      console.error('Error deleting task');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>

                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={updatedTaskData.title}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td>
                    {editingTaskId === task.id ? (
                      <textarea
                        name="description"
                        className="form-control"
                        value={updatedTaskData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    ) : (
                      task.description
                    )}
                  </td>
                  <td>{new Date(task.createdAt?.seconds * 1000).toLocaleString()}</td>
                  <td>
                    {editingTaskId === task.id ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdateTask(task.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEditClick(task.id, task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
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

export default ViewTask;

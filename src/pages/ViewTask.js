import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
        const tasksRef = firebase.firestore().collection('tasks');
        const snapshot = await tasksRef.get();
        const taskList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList); // Set the retrieved tasks to the state
        setLoading(false);
    
    };

    fetchTasks();
  });


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View Tasks</h2>
      {tasks.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.createdAt?.seconds * 1000).toLocaleString()}</td>
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

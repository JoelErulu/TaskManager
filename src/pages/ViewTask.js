import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]); // To store tasks from Firestore
  const [loading, setLoading] = useState(true); // To track loading state

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = firebase.firestore().collection('tasks'); // Replace 'tasks' with your Firestore collection name
        const snapshot = await tasksRef.get();
        const taskList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList); // Set the retrieved tasks to the state
        setLoading(false); // Set loading to false when tasks are fetched
      } catch (error) {
        console.error('Error fetching tasks: ', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchTasks();
  }, []); // The empty array ensures this effect runs once when the component is mounted

  if (loading) {
    return <div>Loading tasks...</div>; // Loading indicator
  }

  return (
    <div>
      <h2>View Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewTask;

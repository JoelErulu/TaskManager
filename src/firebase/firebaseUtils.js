// src/utils/firebaseUtils.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(); // Reusable reference to Firestore

export const getTasks = async () => {
  try {
    const tasksRef = db.collection('tasks');
    const snapshot = await tasksRef.get();
    const tasksList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, tasks: tasksList };
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    return { success: false, error };
  }
};

export const createTask = async (title, description) => {
    try {
      const taskRef = db.collection('tasks');
      await taskRef.add({
        title: title,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating task: ', error);
      return { success: false, error };
    }
  };

  export const deleteTask = async (taskId) => {
    try {
      const taskRef = db.collection('tasks').doc(taskId);
      await taskRef.delete(); 
      return { success: true };
    } catch (error) {
      console.error('Error deleting task: ', error);
      return { success: false, error };
    }
  };

  export const modifyTask = async (taskId, updatedData) => {
    try {
      const taskRef = db.collection('tasks').doc(taskId);
      await taskRef.update(updatedData); 
      return { success: true };
    } catch (error) {
      console.error('Error updating task: ', error);
      return { success: false, error };
    }
  };

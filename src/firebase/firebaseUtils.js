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

export const markTaskAsDone = async (taskId) => {
  try {
    const taskRef = db.collection('tasks').doc(taskId); 
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      throw new Error('Task not found');
    }

    const taskData = taskSnapshot.data();

    await db.collection('completedTasks').doc(taskId).set({
      ...taskData,
      completedAt: new Date().toISOString(), // Add completed timestamp
    });

    await taskRef.delete();

    return { success: true };
  } catch (error) {
    console.error('Error marking task as done: ', error);
    return { success: false, error };
  }
};

export const getCompletedTasks = async () => {
    try {
      const snapshot = await db.collection('completedTasks').get();
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, tasks };
    } catch (error) {
      console.error('Error fetching completed tasks: ', error);
      return { success: false, error };
    }
  };
  
  export const deleteCompletedTask = async (taskId) => {
    try {
      await db.collection('completedTasks').doc(taskId).delete();
      return { success: true };
    } catch (error) {
      console.error('Error deleting completed task: ', error);
      return { success: false, error };
    }
  };


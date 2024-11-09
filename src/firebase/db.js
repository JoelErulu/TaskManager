import firebase from 'firebase/app';
import 'firebase/firestore';

// Function to fetch tasks from the Firestore collection
export const fetchTasks = async (collectionName = 'tasks') => {
  try {
    const taskCollectionRef = firebase.firestore().collection(collectionName);
    const snapshot = await taskCollectionRef.get();
    
    if (snapshot.empty) {
      console.log('No tasks found.');
      return [];
    }

    // Map through the documents and extract the data
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // Includes fields like title, description
    }));

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    throw new Error('Failed to fetch tasks');
  }
};

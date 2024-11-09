import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

// Regular email-password login
export const login = async (data) => {
  const { email, password } = data;
  return await auth.signInWithEmailAndPassword(email, password);
};

// Google login
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    return result.user;
  } catch (error) {
    console.error("Error with Google login", error);
    throw error;
  }
};

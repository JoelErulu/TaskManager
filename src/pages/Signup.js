import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../firebase/auth';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function Signup(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (newUser) {
      props.history.push(`/profile/${newUser.uid}`);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                {...register('firstName')}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                {...register('lastName')}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              {...register('email')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? 'disabled' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

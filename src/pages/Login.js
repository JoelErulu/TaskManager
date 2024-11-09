import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../firebase/auth';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../global.css'; // Custom global styles (if any)

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const routeOnLogin = async (user) => {
    props.history.push(`/profile/${user.uid}`);
  };

  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      routeOnLogin(user);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              ref={register}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              ref={register}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div>
              <Link to="/signup" className="btn btn-link">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link to="/forgotpassword" className="btn btn-link">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

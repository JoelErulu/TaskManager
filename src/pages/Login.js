import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login, signInWithGoogle } from '../firebase/signInWithGoogle';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';

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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      routeOnLogin(user);
    } catch (error) {
      console.error("Google login error:", error);
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

        <div className="mt-4 text-center">
  <button
    className="btn btn-success"
    onClick={handleGoogleLogin}
    disabled={isLoading}
  >
    {isLoading ? 'Signing in with Google...' : 'Sign in with Google'}
  </button>
</div>
        </div>
    </div>
  );
}

export default Login;

import React from 'react';
import { logout } from '../firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '../global.css';  // Custom global styles

function Header() {
  const history = useHistory();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push('/login');
  };

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <header className="bg-white p-3 mb-4">
      <div className="container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            Task Manager
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/view-task">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile/:id">
                  Profile
                </a>
              </li>
              {!!user ? (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={goToLogin}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

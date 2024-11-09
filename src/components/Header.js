import React from 'react';
import { logout } from '../firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

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
      <div className="container d-flex justify-content-between align-items-center">
        <h2 className="text-dark">Task Manager</h2>
        <div>
          {!!user ? (
            <button className="btn" style={{ backgroundColor: '#C82D2F', color: '#white' }} onClick={logoutUser}>
              LOGOUT
            </button>
          ) : (
            <button className="btn" style={{ backgroundColor: '#C82D2F', color: 'white' }} onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';
import { logout } from '../firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';

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
    <header>
      <h2>Task Manager</h2>
      {!!user ? (
        <button className="ui secondary button logout" onClick={logoutUser}>
          LOGOUT
        </button>
      ) : (
        <button className="ui primary button login" onClick={goToLogin}>
          LOGIN
        </button>
      )}
    </header>
  );
}

export default Header;

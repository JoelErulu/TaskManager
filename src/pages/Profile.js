import React from 'react';
import { useSession } from '../firebase/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '../global.css'; // Custom global styles if necessary

const Profile = () => {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">Please log in to view your profile</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Profile Card */}
          <div className="card">
            <div className="card-header text-center">
              <h4>User Profile</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Name:</strong>
                <p className="text-muted">{user.displayName}</p>
              </div>
              <div className="mb-3">
                <strong>Email:</strong>
                <p className="text-muted">{user.email}</p>
              </div>
              <div className="mb-3">
                <strong>User ID:</strong>
                <p className="text-muted">{user.uid}</p>
              </div>
            </div>
    
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;

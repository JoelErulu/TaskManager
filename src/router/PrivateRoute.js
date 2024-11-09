import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useSession();

  if (loading) {
    return <div>Loading...</div>; // or show a spinner while loading the user session
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        const id = props.match.params.id;

        if (!!user) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;

import React from 'react';
import Header from './components/Header.js';
import './firebase/config';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import { UserProvider } from './firebase/UserProvider';
import Profile from './pages/Profile.js';
import ProfileRedirect from './router/ProfileRedirect';
import PrivateRoute from './router/PrivateRoute';
import Landing from './pages/Landing.js';
import TaskManager from './pages/TaskManager.js';
import CreateTask from './pages/CreateTask.js'
import ViewTask from './pages/ViewTask.js'
import UserLanding from './pages/UserLanding.js'
import CompletedTasks from './pages/CompletedTasks.js'





function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <div className="app">
          <div className="ui grid container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute path="/taskmanager" component={TaskManager} />  
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <ProfileRedirect exact path="/signup" component={Signup} />
              <ProfileRedirect exact path="/login" component={Login} />
              <ProfileRedirect exact path="/forgotpassword" component={ForgotPassword} />
              <PrivateRoute path="/create-task" component={CreateTask} />
              <PrivateRoute path="/view-task" component={ViewTask} />
              <PrivateRoute path="/completed-tasks" component={CompletedTasks} />

              <Redirect to="/" />
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

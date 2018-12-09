import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./component/common/PrivateRoute";
import LandingNew from "./component/layout/LandingNew";
import Nav from "./component/layout/Nav";
import Footer from "./component/layout/Footer";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import WaitList from "./component/auth/Waitlist";
import { clearCurrentProfile } from "./actions/profileActions";
import "./App.css";
import Dashboard from "./component/dashboard/Dashboard";
// add or create items
import CreateProfile from "./component/create/CreateProfile";
import AddEducation from "./component/create/portfolio/AddEducation";
import AddExperience from "./component/create/portfolio/AddExperience";

// display items
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import NotFound from "./component/not-found/NotFound";
import AddProject from "./component/create/portfolio/AddProject";

// edit items
import EditProfile from "./component/edit/Profile";
import EditProject from './component/edit/Project';
import EditEducation from './component/edit/Education';
import EditExperience from './component/edit/Experience';
import Posts from "./component/postFeeds/Posts";
import Post from "./component/postComments/Post";

//  Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); //set auth token
  const decoded = jwt_decode(localStorage.jwtToken); // decode user
  store.dispatch(setCurrentUser(decoded)); // set user and isAuthenticated
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="body">
            <Nav />
            <Route exact path="/" component={LandingNew} />
            <Route exact path="/waitlist" component={WaitList} />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> */}
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/me/:me" component={Profile} />
            <Route exact path="/profile/user/:id" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-project" component={AddProject} />
              <PrivateRoute exact path="/experience/:id" component={EditExperience} />
              <PrivateRoute exact path="/education/:id" component={EditEducation} />
              <PrivateRoute exact path="/project/:id" component={EditProject} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

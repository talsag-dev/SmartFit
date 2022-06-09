import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-forms/ProfileForm";
import Exercises from "./components/workout/Exercises";
import Alert from "./components/layout/Alert";

// import AddExperience from "./components/profile-forms/AddExperience";
import WorkoutForm from "./components/workout/WorkoutForm";
// import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Workout from "./components/workout/Workout";
import Menu from "./components/menu/Menu";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AUTH_ERROR, LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";



import "./App.css";
import MenuForm from "./components/menu/MenuForm";

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.access_token && localStorage.token_type) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.access_token, localStorage.token_type);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.access_token || !localStorage.token_type)
        store.dispatch({ type: AUTH_ERROR });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          {/* <Route path='profiles' element={<Profiles />} /> */}
          <Route path='profile/:id' element={<Profile />} />
          <Route
            path='dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path='create-profile'
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path='profile-edit'
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route path='menu' element={<PrivateRoute component={Menu} />} />
          <Route path='menu/:id' element={<PrivateRoute component={Menu} />} />
          <Route
            path='workout'
            element={<PrivateRoute component={Workout} />}
          />
          <Route
            path='create-workout'
            element={<PrivateRoute component={WorkoutForm} />}
          />
          <Route
            path='create-menu'
            element={<PrivateRoute component={MenuForm} />}
          />
          {/* <Route
            path='add-experience'
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path='add-education'
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route path='posts' element={<PrivateRoute component={Posts} />} />
          <Route path='posts/:id' element={<PrivateRoute component={Post} />} /> */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

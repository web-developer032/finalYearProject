import firebase from "firebase/app";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";

import { Provider } from "./Context";

import Home from "./views/Home";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Loading from "./views/reuseables/loading/Loading";

async function setUserStatus(setUser) {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) return setUser(user);
    return setUser(null);
  });
}

function App() {
  // const [authStatus, setAuthStatus] = useState(null);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  // SETTING USER
  useEffect(() => {
    setUserStatus(setUser);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    // here we are passing that store and setStore
    <Provider value={{ user, setUser, loading, setLoading }}>
      <>
        {/* <Nav /> */}
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <Signup />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

          {/* <Route path="/about" component={AboutUs} /> */}
          {/* <Route path="/contactus" component={contactus} /> */}
          <Route
            path="/admin"
            render={() => {
              // return authStatus ? <Admin /> : <Redirect to="/Login" />;
            }}
          ></Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
    </Provider>
  );
}

export default App;

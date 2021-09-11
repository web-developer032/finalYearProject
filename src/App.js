import React, { useState, useEffect } from "react";
import { collection } from "./Firebase";
import { Provider } from "./Context";
import InnerApp from "./InnerApp";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";

function App() {
  // here pass data in the useState which you want to use accross the app so that changing that that will reload the app in order to show the change
  const [store, setStore] = useState(() => "Hi");
  const [loading, setLoading] = useState(true);

  async function getData() {
    const data = await axios.get("https://ip.nf/me.json");

    console.log(data);
    setStore(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    // here we are passing that store and setStore
    <Provider value={{ store, setStore }}>
      <>
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <InnerApp />
            </div>
          </Route>
          {/* <Route path="/about" component={AboutUs} /> */}
          {/* <Route path="/contactus" component={contactus} /> */}
          <Route
            path="/admin"
            render={() => {
              // return authStatus ? <Admin /> : <Redirect to="/Login" />;
            }}
          ></Route>
          <Route path="/Login">
            {/* <Login setAuthStatus={setAuthStatus} authStatus={authStatus} /> */}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
    </Provider>
  );
}

export default App;

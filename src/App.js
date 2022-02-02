import { auth } from "./controller/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";

import { Provider } from "./controller/Context";

import Home from "./views/Home";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Loading from "./views/reuseables/loading/Loading";
import Header from "./views/header/Header";
import Me from "./views/Me/Me";

async function setUserStatus(setUser) {
    await onAuthStateChanged(auth, (user) => {
        if (user) return setUser(user);
        return setUser(null);
    });
}

function App() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    // SETTING USER
    useEffect(() => {
        setUserStatus(setUser);
    }, []);
    return (
        <Provider value={{ user, setUser, loading, setLoading }}>
            <>
                <Loading loading={loading} />
                <Header />
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

                    {user ? (
                        <Route path="/me" component={Me} />
                    ) : (
                        <Redirect to="/login"></Redirect>
                    )}
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

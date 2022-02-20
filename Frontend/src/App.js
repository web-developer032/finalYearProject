import React, { useState, useEffect, useLayoutEffect } from "react";
import { Redirect, Route, Switch } from "react-router";

import axios from "axios";

import { Provider } from "./controller/Context";

import Home from "./views/Home";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Loading from "./views/reuseables/loading/Loading";
import Header from "./views/header/Header";
import Me from "./views/Me/Me";
import ErrorNotification from "./views/reuseables/ErrorNotification/ErrorNotification";
import { setAuthToken } from "./controller/AuthController";

function App() {
    const apiRoutes = {
        survey: "/api/v1/surveys",
        user: "/api/v1/users",
    };
    const [user, setUser] = useState(null);
    const [error, setError] = useState(() => ({ show: false, message: "" }));
    const [loading, setLoading] = useState(false);
    const [surveys, setSurveys] = useState([]);

    // SETTING SURVEYS
    useEffect(() => {
        (async () => {
            const res = await axios.get(`${apiRoutes.survey}`);
            if (res.data.results) {
                setSurveys(res.data.data.docs);
            }
        })();
    }, []);

    // SETTING USER
    useLayoutEffect(() => {
        (async () => {
            const res = await axios.get(`${apiRoutes.user}/checkUserStatus`);
            const data = res.data;
            if (data.data.user) {
                setAuthToken(data.token);
                setUser(data.data.user);
            }
        })();
    }, []);

    // HIDING ERROR AFTER 5s
    useEffect(() => {
        setTimeout(() => {
            setError({ show: false, message: "" });
        }, 1000 * 5);
    }, [error.show]);

    return (
        <Provider
            value={{ apiRoutes, user, setUser, loading, setLoading, setError }}
        >
            <>
                <Loading loading={loading} />
                <ErrorNotification show={error.show} message={error.message} />
                <Header />

                <Switch>
                    <Route path="/login" exact>
                        <Login />
                    </Route>

                    <Route path="/signup" exact>
                        <Signup />
                    </Route>

                    <Route path="/" exact>
                        <Home surveys={surveys} />
                    </Route>

                    {user ? (
                        <Route path="/me" component={Me} />
                    ) : (
                        <Redirect to="/login"></Redirect>
                    )}

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

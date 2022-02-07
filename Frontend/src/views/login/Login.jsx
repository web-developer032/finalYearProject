import { auth } from "../../controller/Firebase";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router";

import "./login.css";
import StoreContext from "../../controller/Context";
import { facebookLogin, googleLogin } from "../../controller/OAuth";
import {
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
    const { user, setUser, loading, setLoading } = useContext(StoreContext);

    const formLogin = (e) => {
        setLoading(true);

        e.preventDefault();
        const email = e.target.loginEmail.value.trim();
        const password = e.target.loginPassword.value.trim();

        setPersistence(auth, browserLocalPersistence).then(async () => {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            ).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.code.split("/")[1];

                if (errorCode.startsWith("auth/wrong")) {
                    alert("Wrong Password!");
                    return;
                }
                if (errorCode.startsWith("auth/user")) {
                    alert("User doesn't exist. Please Signup first.");
                    return;
                } else {
                    alert(errorMessage);
                    return;
                }
            });

            if (data) {
                setUser(auth.currentUser);
            }
        });

        setLoading(false);
    };

    return user ? (
        <Redirect to="/" />
    ) : (
        <>
            <section className="form-container">
                <h1>Login to your Account</h1>

                <form className="form" id="loginForm" onSubmit={formLogin}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        required
                        name="loginEmail"
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        required
                        minLength="8"
                        name="loginPassword"
                    />

                    <div className="row">
                        <Link to="/signup" className="btn">
                            Signup
                        </Link>

                        <button type="submit" className="btn">
                            Login
                        </button>
                    </div>
                </form>

                <div className="row">
                    <NavLink
                        to="#"
                        className="btn icon-btn"
                        onClick={() => facebookLogin(setUser)}
                    >
                        <i className="fab fa-facebook-square"></i>
                        Login with Facebook
                    </NavLink>

                    <NavLink
                        to="#"
                        className="btn icon-btn"
                        onClick={() => googleLogin(setUser)}
                    >
                        <i className="fab fa-google"></i>
                        Login with Google
                    </NavLink>
                </div>

                <ul className="bg-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </section>
        </>
    );
}

export default Login;

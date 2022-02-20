import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router";

import "./login.css";
import StoreContext from "../../controller/Context";
import { login } from "../../controller/AuthController";

function Login() {
    const { apiRoutes, user, setUser, setLoading, setError } =
        useContext(StoreContext);

    const formLogin = async (e) => {
        setLoading(true);

        e.preventDefault();
        const email = e.target.loginEmail.value.trim();
        const password = e.target.loginPassword.value.trim();

        const res = await login({ email, password }, `${apiRoutes.user}/login`);

        if (res.status === "Failed.") {
            setError({ show: true, message: res.message });
        } else {
            setUser(res.data.user);
        }

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

                {/* <div className="row">
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
                </div> */}

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

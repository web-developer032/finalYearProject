import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import StoreContext from "../../controller/Context";
import AuthController, {
    setAuthToken,
    signup,
} from "../../controller/AuthController";

function Signup() {
    const { apiRoutes, user, setUser, setLoading, setError } =
        useContext(StoreContext);

    function validateData(userCredential) {
        if (!userCredential.name) {
            setError({ show: true, message: "Enter your Name." });
            return false;
        }

        if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                userCredential.email
            )
        ) {
            setError({ show: true, message: "Invalid Email." });
            return false;
        }

        if (userCredential.password.length < 8) {
            setError({
                show: true,
                message: "Password must be atleast 8 characters.",
            });
            return false;
        }

        if (userCredential.password !== userCredential.confirmPassword) {
            setError({ show: true, message: "Password doesn't match." });
            return false;
        }

        return true;
    }

    const signupUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        let userCredential = {};
        userCredential.name = e.target.name.value.trim();
        userCredential.email = e.target.email.value.trim().toLowerCase();
        userCredential.password = e.target.password.value.trim();
        userCredential.confirmPassword = e.target.confirmPassword.value.trim();

        if (validateData(userCredential)) {
            const res = await signup(
                userCredential,
                `${apiRoutes.user}/signup`
            );

            if (res.status === "Failed.") {
                setError({ show: true, message: res.message });
            } else {
                setUser(res.data.user);
            }
        }

        setLoading(false);
    };

    return user ? (
        <Redirect to="/" />
    ) : (
        <>
            <section className="form-container">
                <h1>Create an Account</h1>

                <form className="form" id="signupForm" onSubmit={signupUser}>
                    <input
                        className="input"
                        type="text"
                        placeholder="User Name"
                        required
                        name="name"
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        minLength="8"
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        minLength="8"
                        required
                        name="confirmPassword"
                    />

                    <div className="row">
                        <Link to="/login" className="btn">
                            Login
                        </Link>

                        <button type="submit" className="btn">
                            Signup
                        </button>
                    </div>
                </form>

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

export default Signup;

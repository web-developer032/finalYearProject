import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import StoreContext from "../../controller/Context";
import { auth } from "../../controller/Firebase";
import { facebookLogin, googleLogin } from "../../controller/OAuth";

function Signup() {
    const { user, setUser, setLoading } = useContext(StoreContext);

    function validateData(data) {
        let userName = data.userName.value.trim();
        let password = data.signupPassword.value.trim();
        let confirmPassword = data.signupConfirmPassword.value.trim();
        let email = data.signupEmail.value.trim();

        if (!userName) {
            alert("Enter your Name.");
            return false;
        }

        if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            alert("Invalid Email");
            return false;
        }

        if (password.length < 8) {
            alert("Password must be atleast 8 characters.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Password doesn't match");
            return false;
        }

        return true;
    }

    const signupUser = async (e) => {
        e.preventDefault();

        setLoading(true);
        let userName = e.target.userName.value.trim();
        let password = e.target.signupPassword.value.trim();
        let email = e.target.signupEmail.value.trim().toLowerCase();

        if (validateData(e.target)) {
            const data = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                    alert(errorMessage);
                    return;
                } else {
                    alert(errorMessage);
                    return;
                }
            });

            await updateProfile(auth.currentUser, {
                displayName: userName,
            });

            if (data) {
                setUser(auth.currentUser);
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
                        name="userName"
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        required
                        name="signupEmail"
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        required
                        name="signupPassword"
                        minLength="8"
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        minLength="8"
                        required
                        name="signupConfirmPassword"
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

                <div className="row">
                    <Link
                        to="#"
                        className="btn icon-btn"
                        onClick={() => facebookLogin(setUser)}
                    >
                        <i className="fab fa-facebook-square"></i>
                        Signup with Facebook
                    </Link>

                    <Link
                        to="#"
                        className="btn icon-btn"
                        onClick={() => googleLogin(setUser)}
                    >
                        <i className="fab fa-google"></i>
                        Signup with Google
                    </Link>
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

export default Signup;

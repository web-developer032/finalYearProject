import firebase from "firebase/app";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router";

import "./login.css";
import StoreContext from "../../Context";
import { facebookLogin, googleLogin } from "../../OAuth";
import { auth } from "../../Firebase";

function Login() {
  const { user, setUser, loading, setLoading } = useContext(StoreContext);

  const formLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.loginEmail.value.trim();
    const password = e.target.loginPassword.value.trim();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const data = await auth()
          .signInWithEmailAndPassword(email, password)
          .catch(function (error) {
            // Handle Errors here.
            console.log(error);

            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/wrong-password") {
              alert(errorMessage);
              return;
            } else {
              alert(errorMessage);
              return;
            }
          });
        if (data) {
          setUser(data.user);
        }
        setLoading(false);
      });
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <section className="form-container">
        <h1>Login to your Account</h1>

        <form className="form" id="loginForm" onSubmit={formLogin}>
          <input type="email" placeholder="Email" required name="loginEmail" />
          <input
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
            onClick={() => facebookLogin(setUser, setLoading)}
          >
            <i className="fab fa-facebook-square"></i>
            Login with Facebook
          </NavLink>

          <NavLink
            to="#"
            className="btn icon-btn"
            onClick={() => googleLogin(setUser, setLoading)}
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

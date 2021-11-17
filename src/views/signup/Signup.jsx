import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import StoreContext from "../../Context";
import { auth } from "../../Firebase";

import { facebookLogin, googleLogin } from "../../OAuth";

function Signup() {
  const { user, setUser, setLoading } = useContext(StoreContext);

  const signupUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userName = e.target.userName.value.trim();
    let password = e.target.signupPassword.value.trim();
    let confirmPassword = e.target.signupConfirmPassword.value.trim();
    let email = e.target.signupEmail.value.trim();

    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Invalid Email");
    }

    if (password.length < 8) {
      alert("Password must be atleast 8 characters.");
    }

    if (password !== confirmPassword) {
      alert("Password doesn't match");
    }

    const data = await auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
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

    if (data) {
      setUser(data.user);
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
          <input type="text" placeholder="User Name" required name="userName" />
          <input type="email" placeholder="Email" required name="signupEmail" />
          <input
            type="password"
            placeholder="Password"
            required
            name="signupPassword"
            minLength="8"
          />
          <input
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

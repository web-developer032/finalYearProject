import React, { useContext } from "react";
import firebase from "firebase/app";
import StoreContext from "../Context";

function Home() {
  const { user, setUser, loading, setLoading } = useContext(StoreContext);

  function signout() {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <div>
      Home
      <button className="btn" onClick={signout}>
        Signout
      </button>
    </div>
  );
}

export default Home;

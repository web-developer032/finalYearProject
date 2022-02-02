import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../controller/Firebase";

import defaultImage from "../../images/user.png";
import "./header.css";
import StoreContext from "../../controller/Context";

function Header() {
    const { user, setUser, setLoading } = useContext(StoreContext);

    const handleSignout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser(null);
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
        setLoading(false);
    };

    return (
        <header>
            <Link to="/" className="logo">
                Advance Survey
            </Link>

            {user ? (
                <nav>
                    <Link to="/me" className="userImage">
                        <img
                            src={user.photoURL ? user.photoURL : defaultImage}
                            alt="User"
                        />
                    </Link>

                    <button className="btn" onClick={handleSignout}>
                        Signout
                    </button>
                </nav>
            ) : (
                <nav>
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                    <Link to="/signup" className="btn">
                        Signup
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default Header;

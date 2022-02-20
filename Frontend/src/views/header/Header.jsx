import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./header.css";
import StoreContext from "../../controller/Context";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header() {
    const { apiRoutes, user, setUser, setLoading } = useContext(StoreContext);

    const history = useHistory();
    const handleSignout = async () => {
        setLoading(true);
        const res = await axios.get(`${apiRoutes.user}/logout`);

        if (res.data.status === "Success") {
            history.push("/");
            setUser(null);
        }
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
                        <img src={user.photo} alt={user.name} />
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

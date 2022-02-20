import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";

import StoreContext from "../../controller/Context";
import { getBase64URL, resizeImg } from "../../controller/utils";
import "./me.css";

function Me() {
    const { apiRoutes, user, setUser, setLoading, setError } =
        useContext(StoreContext);
    let userImageChanged = false;

    const imgRef = useRef(null);

    const handleUserImage = async (e) => {
        const img = e.target.files[0];

        if (img?.type.startsWith("image/")) {
            userImageChanged = true;
            const imgURL = await getBase64URL(img);
            imgRef.current.src = imgURL;
        }
    };

    const updateMe = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = e.target.name.value.trim();
        const photo = e.target["user-image"].files[0];

        const formData = new FormData();

        if (name && name.toLowerCase() !== user.name.toLowerCase()) {
            formData.append("name", name);
        }

        if (userImageChanged) {
            formData.append("photo", photo);
        }

        const res = await axios.patch(
            `http://localhost:5000${apiRoutes.user}/updateMe`,
            formData
        );
        console.log("Update: ", res.data);
        if (res.data.status === "Success") {
            setError({ show: true, message: "Image Successfully Updated." });
            setUser(res.data.data.user);
        } else {
            setError({
                show: true,
                message:
                    "Something went wrong please refresh page and try again.",
            });
        }
        setLoading(false);
    };

    return (
        <section className="main section-me">
            <form id="update-me" onSubmit={updateMe}>
                <div style={{ marginBottom: "2rem" }}>
                    <figure>
                        <img
                            ref={imgRef}
                            src={user.photo}
                            alt={`${user.name}`}
                            id="userImage"
                        />
                    </figure>

                    <div>
                        <label
                            htmlFor="user-image"
                            className="btn"
                            style={{
                                textAlign: "center",
                                padding: "1rem",
                                fontSize: "1.6rem",
                            }}
                            placeholder="Select Image"
                        >
                            Choose Image
                        </label>
                        <input
                            onChange={handleUserImage}
                            type="file"
                            name="user-image"
                            id="user-image"
                            accept="image/*"
                            placeholder="Choose File"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user.name}
                    />
                </div>
                {/* <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />
                </div> */}
                <button className="btn">Update</button>
            </form>
        </section>
    );
}

export default Me;

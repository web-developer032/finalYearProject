import { updatePassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";

import StoreContext from "../../controller/Context";
import { auth, storage } from "../../controller/Firebase";
import { getBase64URL, imageResizer, resizeImg } from "../../controller/utils";
import defaultImage from "../../images/user.png";
import "./me.css";

function Me() {
    const { user, setUser, setLoading } = useContext(StoreContext);
    const [userImageChanged, setUserImageChanged] = useState(false);

    const imgRef = useRef(null);

    const [userImage, setUserImage] = useState(
        user.photoURL ? user.photoURL : defaultImage
    );

    const handleUserImage = async (e) => {
        const img = e.target.files[0];

        if (img?.type.startsWith("image/")) {
            setUserImageChanged(true);
            const imgURL = await getBase64URL(img);
            imgRef.current.src = imgURL;
        }
    };

    const saveUserImage = async (img) => {
        if (img?.type.startsWith("image/")) {
            const imgURL = await getBase64URL(img);

            const resizedImg = await resizeImg(imgURL, 500, false);
            const userImageRef = ref(storage, `userImages/${user.uid}.png`);

            await uploadBytes(userImageRef, resizedImg);
        } else {
            alert("Invalid Image file.");
            return;
        }
    };

    const updateMe = async (e) => {
        e.preventDefault();

        setLoading(true);
        const name = e.target.name.value.trim();
        const password = e.target.password.value.trim();
        const confirmPassword = e.target.confirmPassword.value.trim();

        const img = e.target["user-image"].files[0];

        const userData = {};

        if (name && name.toLowerCase() !== user.displayName.toLowerCase()) {
            userData.displayName = name;
        }

        if (password === confirmPassword) {
            await updatePassword(user, password);
        }

        if (userImageChanged) {
            await saveUserImage(img);

            const userImageUrl = await getDownloadURL(
                ref(storage, `userImages/${user.uid}.png`)
            );

            userData.photoURL = userImageUrl;
        }

        await updateProfile(auth.currentUser, {
            ...userData,
        });

        setUser((prevUser) => ({ ...prevUser, ...user }));
        setLoading(false);
    };

    return (
        <section className="main section-me">
            <form id="update-me" onSubmit={updateMe}>
                <div style={{ marginBottom: "2rem" }}>
                    <figure>
                        <img
                            ref={imgRef}
                            src={userImage}
                            alt={`${user.photoURL}`}
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
                        defaultValue={user.displayName}
                    />
                </div>
                <div>
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
                </div>
                <button className="btn">Update</button>
            </form>
        </section>
    );
}

export default Me;

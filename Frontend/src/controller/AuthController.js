import axios from "axios";

export async function login(userCredential, route) {
    const res = await axios.post(route, userCredential);
    setAuthToken(res.data.token);
    return res.data;
}
export async function signup(userCredential, route) {
    const res = await axios.post(route, userCredential);
    setAuthToken(res.data.token);
    return res.data;
}

export const setAuthToken = (token) => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

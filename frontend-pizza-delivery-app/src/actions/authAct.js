import axios from "axios";
import {GET_USER_DETAILS, GET_USER_ERROR, SET_CURRENT_USER} from "./types";
import {setJWTToken} from "./setJWTToken";
import jwt_decode from "jwt-decode";
import fetchClient from './fetchClient'

const userRegistration = (newUser, history) => async dispatch => {
    try {
        await fetchClient.post("/users", newUser);

        history.push("/login");
        dispatch({
            type: GET_USER_ERROR,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error.response.data
        });
    }
}

const userLogin = (loginRequest, history) => async dispatch => {

    try {
        const res = await axios.post("/login", loginRequest);
        const token = res.headers.authorization;
        const userId = jwt_decode(token).sub;
        setJWTToken(token);

        window.localStorage.setItem("jwtToken", token);
        window.localStorage.setItem("userId", userId);

        dispatch({
            type: SET_CURRENT_USER,
            payload: {token, userId}
        })

        history.push("/");

    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error.response.data
        })
    }
}

const userLogOut = (history) => dispatch => {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("userId");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
    history.push("/login");
}

const getUserDetails = (userId) => async dispatch => {

    try {
        const response = await fetchClient.get(`/users/${userId}`);

        dispatch({
            type: GET_USER_DETAILS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error.response.data
        });

    }
}

export {userRegistration,userLogin,userLogOut, getUserDetails}

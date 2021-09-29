import axios from "axios";
import {
    DELETE_USER_FAILED,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS,
    GET_USER_DETAILS,
    GET_USER_ERROR,
    SET_CURRENT_USER, UPDATE_USER_INFO, USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "./util/types";
import {setJWTToken} from "./util/setJWTToken";
import jwt_decode from "jwt-decode";
import fetchClient from './util/fetchClient'

const userRegistration = (newUser, history) => async dispatch => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
        await fetchClient.post("/users", newUser);
        history.push("/login");
        dispatch({type: USER_REGISTER_SUCCESS});
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILED,
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

        dispatch({
            type: SET_CURRENT_USER,
            payload: {token, userId}
        })

        const response = await fetchClient.get(`/users/${userId}`);
        dispatch({
            type: GET_USER_DETAILS,
            payload: response.data
        });
        localStorage.setItem('currentUser', JSON.stringify(response.data))

        history.push("/");

    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error.response.data
        })
    }
}

const userLogOut = () => dispatch => {

    setJWTToken(false);
    window.location.href="/login"

    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("currentUser");
}

const updateUserDetails = (userId,firstName,lastName,history) => async dispatch => {

    const updateUser = {
        firstName: firstName,
        lastName: lastName
    }

    try {
        const response = await fetchClient.put(`/users/${userId}`, updateUser);
        dispatch({
            type: UPDATE_USER_INFO,
            payload: response.data
        });
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        history.push("/");
        window.location.reload();
    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            payload: error.response.data
        });
    }
}

const getAllUsers = () => async dispatch => {
    try {
        const response = await fetchClient.get('/users');
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAILED,
            payload: error.response.data
        });
    }
}

const deleteUser = (userId) => async dispatch => {

    dispatch({type: DELETE_USER_REQUEST})
    try {

        const response = await fetchClient.delete(`/users/${userId}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: userId
        })
        window.location.reload();

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILED,
            payload: error.response.data
        })
    }
}

export {userRegistration,userLogin,userLogOut, updateUserDetails, getAllUsers, deleteUser}

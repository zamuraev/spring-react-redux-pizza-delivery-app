import {
    DELETE_USER_FAILED,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    GET_ALL_ORDERS_FAILED,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_USER_DETAILS,
    SET_CURRENT_USER,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../actions/util/types";

const initialState = {
    token: {},
    currentUser: {}
}

const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SET_CURRENT_USER):
            return {
                ...state,
                token: action.payload
            }
        case (GET_USER_DETAILS):
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}

const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case (USER_REGISTER_REQUEST):
            return {
                loading: true
            }
        case (USER_REGISTER_SUCCESS):
            return {
                loading: false,
                success: true
            }
        case (USER_REGISTER_FAILED):
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const getAllUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case (GET_ALL_USERS_REQUEST):
            return {
                loading: true
            }
        case (GET_ALL_USERS_SUCCESS):
            return {
                loading: false,
                users: action.payload
            }
        case (GET_ALL_ORDERS_FAILED):
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const deleteUserReducer = (state= {users: []}, action) => {

    switch (action.type) {

        case DELETE_USER_REQUEST: return {
            deleteLoading: true,
            ...state
        }
        case DELETE_USER_SUCCESS: return {
            deleteLoading: false,
            deleteSuccess: true,
            users: state.users.filter(user=> user.userId !== action.payload)

        }
        case DELETE_USER_FAILED: return {
            deleteLoading: false,
            deleteError: action.payload
        }
        default: return state
    }
}

export {loginUserReducer,registerUserReducer,getAllUsersReducer, deleteUserReducer}

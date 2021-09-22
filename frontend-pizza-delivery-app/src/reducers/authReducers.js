import {GET_USER_DETAILS, SET_CURRENT_USER} from "../actions/types";

const initialState = {
    token: {},
    currentUser: {},
    userId: {}
}

export const getLogInUser = (state = initialState, action) => {

    switch (action.type) {

        case (SET_CURRENT_USER):

            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
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



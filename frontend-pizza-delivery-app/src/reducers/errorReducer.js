import {GET_USER_ERROR} from "../actions/types";

const initialState = {};

export const getUserError =  (state=initialState, action) => {
    switch (action.type) {

        case GET_USER_ERROR: return action.payload;

        default: return state
    }
}


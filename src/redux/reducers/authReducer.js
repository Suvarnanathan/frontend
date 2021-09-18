import { FETCH_LOGIN_DETAILS_SUCCESS, LOGIN_SUCCESS, PROFILE_SUCCESS } from "../types/authActionType";

const initialState = {
    authUser: null,
    authDetails: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, authUser: action.payload };
        case PROFILE_SUCCESS:
            return { ...state, authUser: action.payload };

        case FETCH_LOGIN_DETAILS_SUCCESS:
            return { ...state, authDetails: action.payload };

        default:
            return { ...state };
    }
};

export default authReducer;
import { FETCH_LOGIN_DETAILS_SUCCESS, LOGIN_ERROR, LOGIN_SUCCESS, PROFILE_SUCCESS } from "../types/authActionType";


//Action Creator
export const loginSucess = (user) => ({
    type: LOGIN_SUCCESS,
    payload:user
});

export const loginError = () => ({
    type: LOGIN_ERROR,
});

export const profileSucess = (user) => ({
    type: PROFILE_SUCCESS ,
    payload:user
});

export const fetchAuthDetails = (data) => ({
    type: FETCH_LOGIN_DETAILS_SUCCESS ,
    payload:data
});
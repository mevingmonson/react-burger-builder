import axios from 'axios';
import { actionTypes } from './actionTypes';


const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
});

const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
})

const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
})

const checkAuthTimeout = (expirationTime) => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expirationTime * 1000);
}

export const authAction = (email, password, isSignUp) => dispatch => {
    dispatch(authStart())
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLUI5URj5SJNlWaveyHe2cB4S8xlRuM_8';
    if (!isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLUI5URj5SJNlWaveyHe2cB4S8xlRuM_8'
    }
    axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
}
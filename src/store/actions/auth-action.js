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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

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
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
}

// setting path to BurgerBuilder or checkout depending on purchasing
export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
})


export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
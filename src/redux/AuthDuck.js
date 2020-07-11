import axios from "axios";
import { base_url } from "./variables";
axios.defaults.withCredentials = true;

//Action types
const LOADING = "cleanvel/user/LOADING";
const LOGIN_SUCCESS = "cleanvel/user/LOGIN_SUCCESS";
const LOGIN_ERROR = "cleanvel/user/LOGIN_ERROR";
const LOGOUT_SUCCESS = "cleanvel/user/LOGOUT_SUCCESS";

const initialState = {
    data: JSON.parse(localStorage.getItem("user")),
    status: "",
    error: undefined,
};


//Reucer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, status: "pending" };
        case LOGIN_SUCCESS:
            return { status: "success", data: { ...action.payload } };
        case LOGIN_ERROR:
            return { status: "error", error: action.error };
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}


//Action creators
export const loadingUser = () => ({
    type: LOADING,
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});


//login thunk
export const login = (credentials) => (dispatch) => {
    dispatch(loadingUser());
    return axios
        .post(`${base_url}/login`, credentials)
        .then((res) => {
            const user = res.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(loginSuccess(user));
        })
        .catch((res) => dispatch(loginError(res.response.data)));
};

//logout thunk
export const logout = () => (dispatch) => {
    return axios
        .post(`${base_url}/logout`)
        .then(() => {
            localStorage.removeItem("user");
            dispatch(logoutSuccess());
        });
};


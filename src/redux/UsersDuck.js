import axios from "axios";
import { base_url } from "./variables";
import { normalizeData } from "../utils/formatters";

//Action types
const LOADING = "cleanvel/products/LOADING";
const GET_USERS_SUCCESS = "cleanvel/products/GET_USERS_SUCCESS";
const GET_USERS_ERROR = "cleanvel/products/GET_USERS_ERROR";

const CREATE_USER_SUCCESS = "cleanvel/products/CREATE_USER_SUCCESS"
const CREATE_USER_ERROR = "cleanvel/products/CREATE_USER_ERROR"

const EDIT_USER_SUCCESS = "cleanvel/products/EDIT_USER_SUCCESS"
const EDIT_USER_ERROR = "cleanvel/products/EDIT_USER_ERROR"

const DELETE_USER_SUCCESS = "cleanvel/products/DELETE_USER_SUCCESS"
const DELETE_USER_ERROR = "cleanvel/products/DELETE_USER_ERROR"

const SEARCH_USER_SUCCESS = "cleanvel/products/SEARCH_USER_SUCCESS"
const SEARCH_USER_ERROR = "cleanvel/products/SEARCH_USER_ERROR"


//Setting initial state
const initialState = {
    users: {},
    status: "",
    error: undefined,
};

//Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, status: "pending" };
        case GET_USERS_SUCCESS:
            return { ...state, status: "success", users: { ...action.payload } };
        case GET_USERS_ERROR:
            return { ...state, status: "error", error: action.error }

        case CREATE_USER_SUCCESS:
            return { ...state, status: "success", users: { ...state.users, [action.payload._id]: action.payload } }
        case CREATE_USER_ERROR:
            return { ...state, status: "error", error: action.error }

        case EDIT_USER_SUCCESS:
            return { ...state, status: "success", users: { ...state.users, [action.payload._id]: action.payload } }
        case EDIT_USER_ERROR:
            return { ...state, status: "error", error: action.error }

        case DELETE_USER_SUCCESS:
            return { ...state, status: "success" }
        case DELETE_USER_ERROR:
            return { ...state, status: "error", error: action.error }

        case SEARCH_USER_SUCCESS:
            return { ...state, status: "success", editableUser: { ...action.payload } }
        case SEARCH_USER_ERROR:
            return { ...state, status: "error", error: action.error }

        default:
            return state;
    }
}

//Action creators
export const loadingUsers = () => ({
    type: LOADING,
});

export const getUsersSuccess = (payload) => ({
    type: GET_USERS_SUCCESS,
    payload,
});

export const getUsersError = (error) => ({
    type: GET_USERS_ERROR,
    error,
});

export const createUserSuccess = (payload) => ({
    type: CREATE_USER_SUCCESS,
    payload,
});

export const createUserError = (error) => ({
    type: CREATE_USER_ERROR,
    error,
});


export const editUserSuccess = (payload) => ({
    type: EDIT_USER_SUCCESS,
    payload,
});

export const editUserError = (error) => ({
    type: EDIT_USER_ERROR,
    error,
});

export const deleteUserSuccess = (payload) => ({
    type: DELETE_USER_SUCCESS,
    payload,
});

export const deleteUserError = (error) => ({
    type: DELETE_USER_ERROR,
    error,
});

export const searchUserSuccess = (payload) => ({
    type: SEARCH_USER_SUCCESS,
    payload,
});

export const searchUserError = (error) => ({
    type: SEARCH_USER_ERROR,
    error,
});


//Get users thunk
export const getUsers = () => (dispatch) => {
    dispatch(loadingUsers());
    return axios
        .get(`${base_url}/users`)
        .then((res) => {
            const users = normalizeData(res.data.users);
            dispatch(getUsersSuccess(users));
        })
        .catch((err) => {
            dispatch(getUsersError(err));
        })
};

//Create user thunk
export const createUser = (data) => (dispatch) => {
    dispatch(loadingUsers());
    return axios
        .post(`${base_url}/users`, data, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => {
            dispatch(createUserSuccess(res.data.msg));
        })
        .catch((err) => {
            dispatch(createUserError(err));
        });
};

//Edit user thunk
export const editUser = (params) => (dispatch) => {
    dispatch(loadingUsers());
    return axios
        .patch(`${base_url}/users/${params.id}`, params.data)
        .then((res) => {
            dispatch(editUserSuccess(res.data.user));
        })
        .catch((err) => {
            dispatch(editUserError(err));
        });
};

//Search user thunk
export const searchUser = (id) => (dispatch) => {
    dispatch(loadingUsers());
    return axios
        .get(`${base_url}/users/${id}`)
        .then((res) => {
            dispatch(searchUserSuccess(res.data.user));
        })
        .catch((err) => {
            dispatch(searchUserError(err));
        });
};

//Delete user thunk
export const deleteUser = (id) => (dispatch) => {
    dispatch(loadingUsers());
    return axios
        .delete(`${base_url}/users/${id}`)
        .then((res) => {
            dispatch(deleteUserSuccess(res.data.user));
        })
        .catch((err) => {
            dispatch(deleteUserSuccess(err));
        })
};




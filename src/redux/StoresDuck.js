import axios from "axios";
import { base_url } from "./variables";
import { normalizeData } from "../utils/formatters";

//Action types
const LOADING = "cleanvel/stores/LOADING";
const GET_STORES_SUCCESS = "cleanvel/stores/GET_STORES_SUCCESS";
const GET_STORES_ERROR = "cleanvel/stores/GET_STORES_ERROR";

const SEARCH_STORE_SUCCESS = "cleanvel/stores/SEARCH_STORE_SUCCESS";
const SEARCH_STORE_ERROR = "cleanvel/stores/SEARCH_STORE_ERROR";

const EDIT_STORE_SUCCESS = "cleanvel/stores/EDIT_STORE_SUCCESS";
const EDIT_STORE_ERROR = "cleanvel/stores/EDIT_STORE_ERROR";

//Setting initial state
const initialState = {
    stores: {},
    status: "",
    error: undefined,
};

//Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, status: "pending" };
        case GET_STORES_SUCCESS:
            return { ...state, status: "success", stores: { ...action.payload } };
        case GET_STORES_ERROR:
            return { ...state, status: "error", error: action.error }

        case SEARCH_STORE_SUCCESS:
            return { ...state, status: "success", editableStore: { ...action.payload } }
        case SEARCH_STORE_ERROR:
            return { ...state, status: "error", error: action.error }

        case EDIT_STORE_SUCCESS:
            return { ...state, status: "success", stores: { ...state.stores, [action.payload._id]: action.payload } }
        case EDIT_STORE_ERROR:
            return { ...state, status: "error", error: action.error }

        default:
            return state;
    }
}

//Action creators
export const loadingStores = () => ({
    type: LOADING,
});

export const getStoresSuccess = (payload) => ({
    type: GET_STORES_SUCCESS,
    payload,
});

export const getStoresError = (error) => ({
    type: GET_STORES_ERROR,
    error,
});

export const searchStoreSuccess = (payload) => ({
    type: SEARCH_STORE_SUCCESS,
    payload,
});

export const searchStoreError = (error) => ({
    type: SEARCH_STORE_ERROR,
    error,
});

export const editStoreSuccess = (payload) => ({
    type: EDIT_STORE_SUCCESS,
    payload,
});

export const editStoreError = (error) => ({
    type: EDIT_STORE_ERROR,
    error,
});


//Get stores thunk
export const getStores = () => (dispatch) => {
    dispatch(loadingStores());
    return axios
        .get(`${base_url}/stores`)
        .then((res) => {
            const stores = normalizeData(res.data.stores);
            dispatch(getStoresSuccess(stores));
        })
        .catch((err) => {
            dispatch(getStoresError(err));
        })
};

//Search store thunk
export const searchStore = (id) => (dispatch) => {
    dispatch(loadingStores());
    return axios
        .get(`${base_url}/stores/${id}`)
        .then((res) => {
            dispatch(searchStoreSuccess(res.data.store));
        })
        .catch((err) => {
            dispatch(searchStoreError(err));
        });
};



//Edit store thunk
export const editStore = (params) => (dispatch) => {
    dispatch(loadingStores());
    return axios
        .patch(`${base_url}/stores/${params.id}`, params.data)
        .then((res) => {
            dispatch(editStoreSuccess(res.data.store));
        })
        .catch((err) => {
            dispatch(editStoreError(err));
        });
};

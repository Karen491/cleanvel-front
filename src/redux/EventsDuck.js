import axios from "axios";
import { base_url } from "./variables";
import { normalizeData } from "../utils/formatters";

//Action types
const LOADING = "cleanvel/stores/LOADING";
const GET_EVENTS_SUCCESS = "cleanvel/events/GET_EVENTS_SUCCESS";
const GET_EVENTS_ERROR = "cleanvel/events/GET_EVENTS_ERROR";

const GET_PRODUCTSALES_SUCCESS = "cleanvel/events/GET_PRODUCTSALES_SUCCESS";
const GET_PRODUCTSALES_ERROR = "cleanvel/events/GET_PRODUCTSALES_ERROR";

const CREATE_EVENT_SUCCESS = "cleanvel/events/CREATE_EVENT_SUCCESS";
const CREATE_EVENT_ERROR = "cleanvel/events/CREATE_EVENT_ERROR";

//Setting initial state
const initialState = {
    events: {},
    status: "",
    error: undefined,
};

//Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, status: "pending" };
        case GET_EVENTS_SUCCESS:
            return { ...state, status: "success", events: { ...action.payload } };
        case GET_EVENTS_ERROR:
            return { ...state, status: "error", error: action.error }

        case GET_PRODUCTSALES_SUCCESS:
            return { ...state, status: "success", productsSales: { ...action.payload } };
        case GET_PRODUCTSALES_ERROR:
            return { ...state, status: "error", error: action.error }

        case CREATE_EVENT_SUCCESS:
            return { ...state, status: "success", events: { ...state.stores, [action.payload._id]: action.payload } }
        case CREATE_EVENT_ERROR:
            return { ...state, status: "error", error: action.error }

        default:
            return state;
    }
};

//Action creators
export const loadingEvents = () => ({
    type: LOADING,
});

export const getEventsSuccess = (payload) => ({
    type: GET_EVENTS_SUCCESS,
    payload,
});

export const getEventsError = (error) => ({
    type: GET_EVENTS_ERROR,
    error,
});

export const getProductsSalesSuccess = (payload) => ({
    type: GET_PRODUCTSALES_SUCCESS,
    payload,
});

export const getProductsSalesError = (error) => ({
    type: GET_PRODUCTSALES_ERROR,
    error,
});

export const createEventSuccess = (payload) => ({
    type: CREATE_EVENT_SUCCESS,
    payload,
});

export const createEventError = (error) => ({
    type: CREATE_EVENT_ERROR,
    error,
});


//Get event thunk
export const getEvents = () => (dispatch) => {
    dispatch(loadingEvents());
    return axios
        .get(`${base_url}/events`)
        .then((res) => {
            const events = normalizeData(res.data.events);
            dispatch(getEventsSuccess(events));
        })
        .catch((err) => {
            dispatch(getEventsError(err));
        })
};

//Create event thunk
export const createEvent = (data) => (dispatch) => {
    dispatch(loadingEvents());
    return axios
        .post(`${base_url}/events`, data)
        .then((res) => {
            dispatch(createEventSuccess(res.data.msg));
        })
        .catch((err) => {
            dispatch(createEventError(err));
        });
};

//Get sales per product (needed for sales graph)
export const getProductsSales = () => (dispatch) => {
    dispatch(loadingEvents());
    return axios
        .get(`${base_url}/events/sale`)
        .then((res) => {
            const productsSales = normalizeData(res.data.list);
            dispatch(getProductsSalesSuccess(productsSales));
        })
        .catch((err) => {
            dispatch(getProductsSalesError(err));
        })
};
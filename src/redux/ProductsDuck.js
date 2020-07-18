import axios from "axios";
import { base_url } from "./variables";
import { normalizeData } from "../utils/formatters";

//Action types
const LOADING = "cleanvel/products/LOADING";
const GET_PRODUCTS_SUCCESS = "cleanvel/products/GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "cleanvel/products/GET_PRODUCTS_ERROR";

const CREATE_PRODUCT_SUCCESS = "cleanvel/products/CREATE_PRODUCT_SUCCESS";
const CREATE_PRODUCT_ERROR = "cleanvel/products/CREATE_PRODUCT_ERROR";

const SEARCH_PRODUCT_SUCCESS = "cleanvel/products/SEARCH_PRODUCT_SUCCESS";
const SEARCH_PRODUCT_ERROR = "cleanvel/products/SEARCH_PRODUCT_ERROR";

const EDIT_PRODUCT_SUCCESS = "cleanvel/products/EDIT_PRODUCT_SUCCESS";
const EDIT_PRODUCT_ERROR = "cleanvel/products/EDIT_PRODUCT_ERROR";

const DELETE_PRODUCT_SUCCESS = "cleanvel/products/DELETE_PRODUCT_SUCCESS";
const DELETE_PRODUCT_ERROR = "cleanvel/products/DELETE_PRODUCT_ERROR";

//Setting initial state
const initialState = {
    products: {},
    status: "",
    error: undefined,
};

//Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, status: "pending" };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, status: "success", products: { ...action.payload } };
        case GET_PRODUCTS_ERROR:
            return { ...state, status: "error", error: action.error }

        case CREATE_PRODUCT_SUCCESS:
            return { ...state, status: "success", products: { ...state.products, [action.payload._id]: action.payload } }
        case CREATE_PRODUCT_ERROR:
            return { ...state, status: "error", error: action.error }

        case SEARCH_PRODUCT_SUCCESS:
            return { ...state, status: "success", editableProduct: { ...action.payload } }
        case SEARCH_PRODUCT_ERROR:
            return { ...state, status: "error", error: action.error }

        case EDIT_PRODUCT_SUCCESS:
            return { ...state, status: "success", products: { ...state.products, [action.payload._id]: action.payload } }
        case EDIT_PRODUCT_ERROR:
            return { ...state, status: "error", error: action.error }

        case DELETE_PRODUCT_SUCCESS:
            return { ...state, status: "success" }
        case DELETE_PRODUCT_ERROR:
            return { ...state, status: "error", error: action.error }


        default:
            return state;
    }
}

//Action creators
export const loadingProducts = () => ({
    type: LOADING,
});

export const getProductsSuccess = (payload) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload,
});

export const getProductsError = (error) => ({
    type: GET_PRODUCTS_ERROR,
    error,
});

export const createProductSuccess = (payload) => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload,
});

export const createProductError = (error) => ({
    type: CREATE_PRODUCT_ERROR,
    error,
});

export const searchProductSuccess = (payload) => ({
    type: SEARCH_PRODUCT_SUCCESS,
    payload,
});

export const searchProductError = (error) => ({
    type: SEARCH_PRODUCT_ERROR,
    error,
});

export const editProductSuccess = (payload) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload,
});

export const editProductError = (error) => ({
    type: EDIT_PRODUCT_ERROR,
    error,
});

export const deleteProductSuccess = (payload) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload,
});

export const deleteProductError = (error) => ({
    type: DELETE_PRODUCT_ERROR,
    error,
});


//Get products thunk
export const getProducts = () => (dispatch) => {
    dispatch(loadingProducts());
    return axios
        .get(`${base_url}/products`)
        .then((res) => {
            const products = normalizeData(res.data.products);
            dispatch(getProductsSuccess(products));
        })
        .catch((err) => {
            dispatch(getProductsError(err));
        })
};

//Create product thunk
export const createProduct = (data) => (dispatch) => {
    dispatch(loadingProducts());
    return axios
        .post(`${base_url}/products`, data)
        .then((res) => {
            dispatch(createProductSuccess(res.data.msg));
        })
        .catch((err) => {
            dispatch(createProductError(err));
        });
};

//Search product thunk
export const searchProduct = (id) => (dispatch) => {
    dispatch(loadingProducts());
    return axios
        .get(`${base_url}/products/${id}`)
        .then((res) => {
            dispatch(searchProductSuccess(res.data.product));
        })
        .catch((err) => {
            dispatch(searchProductError(err));
        });
};

//Edit product thunk
export const editProduct = (params) => (dispatch) => {
    dispatch(loadingProducts());
    return axios
        .patch(`${base_url}/products/${params.id}`, params.data)
        .then((res) => {
            dispatch(editProductSuccess(res.data.product));
        })
        .catch((err) => {
            dispatch(editProductError(err));
        });
};

//Delete product thunk
export const deleteProduct = (id) => (dispatch) => {
    dispatch(loadingProducts());
    return axios
        .delete(`${base_url}/products/${id}`)
        .then((res) => {
            dispatch(deleteProductSuccess(res.data.product));
        })
        .catch((err) => {
            dispatch(deleteProductError(err));
        })
};

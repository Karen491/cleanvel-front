import axios from "axios";
axios.defaults.withCredentials = true;

//Action types
const LOADING = "cleanvel/user/LOADING";
const LOGIN_SUCESS = "cleanvel/user/LOGIN_SUCESS";
const LOGIN_ERROR = "cleanvel/user/LOGIN_ERROR";
const LOGOUT = "cleanvel/user/LOGOUT";

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
        case LOGIN_SUCESS:
            return { status: "success", data: { ...action.payload } };
        case LOGIN_ERROR:
            return { status: "error", error: action.error };
        case LOGOUT:
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
    type: LOGIN_SUCESS, 
    payload,
});

export const loginError = (error) => ({
    type: LOGIN_ERROR, 
    error,
});

export const logout = () => ({
    type: LOGOUT,
});


//login thunk
export const login = (credentials) => (dispatch) => {
    dispatch(loadingUser());
    return axios
    .post("http://localhost:3000/login", credentials)
    .then((res) => {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginSuccess(user));
    })
    .catch((res) => dispatch(loginError(res.response.data)));
};


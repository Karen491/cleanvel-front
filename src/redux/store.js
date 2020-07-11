import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import user from "./AuthDuck";
import users from "./UsersDuck";

export const rootReducer = combineReducers({
    user,
    users,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)),
);

export default store;
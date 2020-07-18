import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import user from "./AuthDuck";
import users from "./UsersDuck";
import products from "./ProductsDuck";
import stores from "./StoresDuck";

export const rootReducer = combineReducers({
    user,
    users,
    products,
    stores,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)),
);

export default store;
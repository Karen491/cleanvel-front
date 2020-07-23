import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../src/redux/ProductsDuck";
import { getEvents } from "../src/redux/EventsDuck";
import AuthForm from "./components/Home/AuthForm";
import Navbar from "./components/Home/navbar";
import Routes from "./Routes";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="uk-width-expand uk-margin-remove" uk-grid="true">
      {!user && <AuthForm />}
      {user && <Navbar user={user} />}
      <Routes />
    </div>
  );
}

export default App;

import React from 'react';
import { useSelector } from "react-redux";
import AuthForm from "./components/Home/AuthForm";
import Navbar from "./components/Home/Navbar";
import Routes from "./Routes";
import './App.css';

function App() {
  const user = useSelector(state => state.user.data);

  return (
    <div className="uk-width-expand uk-margin-remove" uk-grid="true">
      {!user && <AuthForm />}
      {user && <Navbar user={user} />}
      <Routes />
    </div>
  );
}

export default App;

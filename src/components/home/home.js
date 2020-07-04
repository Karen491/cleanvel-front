import React from "react";
import { useSelector } from "react-redux";
import AuthForm from "./authForm";

const Home = () => {

    const user = useSelector(state => state.user.data);

    return (
        <div className="home">
            {!user && <AuthForm />}
            {user && <h1>Cleanvel</h1>}
        </div>
    )
};

export default Home;
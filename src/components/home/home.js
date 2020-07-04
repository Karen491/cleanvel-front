import React from "react";
import { useSelector } from "react-redux";
import AuthForm from "./authForm";
import Navbar from "./navbar";

const Home = () => {
    const user = useSelector(state => state.user.data);

    return (
        <div className="home">
            {!user && <AuthForm />}
            {user && <Navbar user={user} />}
        </div>
    )
};

export default Home;
import React from "react";
import { useSelector } from "react-redux";
import AuthForm from "./AuthForm";
import Navbar from "./Navbar";

const Home = () => {
    const user = useSelector(state => state.user.data);

    return (
        <div className="uk-padding-remove">
            {!user && <AuthForm />}
            {user && <Navbar user={user} />}
        </div>
    )
};

export default Home;
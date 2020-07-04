import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/UserDuck";

const AuthForm = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({});

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setCredentials((prevState) => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    return (
        <div className="authform">
            <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-width-2xlarge" uk-grid="true">
                <div className="uk-card-media-left uk-cover-container">
                    <img src="/images/cleanvel-login.jpeg" alt="" uk-cover="true" />
                </div>
                <div className="uk-card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <img src="/images/cleanvel-logo.png" alt="" />
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input
                                    className="uk-input"
                                    onChange={handleChange}
                                    name="username"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                <input
                                    className="uk-input"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                />
                            </div>
                        </div>
                        <button className="uk-button uk-button-default">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AuthForm;

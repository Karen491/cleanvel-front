import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthDuck";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`

const AuthForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (values) => {
        dispatch(login(values));
    };

    return (
        <div className="authform-background">
            <div className="authform">
                <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-width-3xlarge" uk-grid="true">
                    <div className="uk-card-media-left uk-cover-container">
                        <img src="/images/cleanvel-login.jpeg" alt="" uk-cover="true" />
                    </div>
                    <div className="uk-card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <img src="/images/cleanvel-logo.png" alt="" />
                            </div>
                            <div className="uk-margin">
                                <div className="uk-inline">
                                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                                    <input
                                        className="uk-input"
                                        name="username"
                                        type="text"
                                        ref={register({ required: true })}
                                    />
                                </div>
                                {errors.username && <Error>El usuario es requerido</Error>}
                            </div>

                            <div className="uk-margin">
                                <div className="uk-inline">
                                    <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                    <input
                                        className="uk-input"
                                        name="password"
                                        type="password"
                                        ref={register({ required: true })}
                                    />
                                </div>
                                {errors.password && <Error>La contraseña es requerida</Error>}
                            </div>
                            <button className="uk-button uk-button-default">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthForm;
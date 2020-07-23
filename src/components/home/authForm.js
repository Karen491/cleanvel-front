import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthDuck";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`

const Card = styled.div`
background-color: #1f3e49e3;
`

const ImgCard = styled.div`
background-color: #FEFFFF;
border-radius: 5%;
padding: 5px 10px;
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
        <div className="authform uk-width-1-1 uk-flex uk-flex-middle uk-flex-center" uk-height-viewport="true">
            <div className="uk-child-width-1-2@s uk-margin-xlarge-right uk-margin-large-left" uk-grid="true">
                <div className="uk-card-media-left uk-cover-container">
                    <img src="/images/cleanvel-login.jpeg" alt="" uk-cover="true" />
                    <canvas width="600" height="450"></canvas>
                </div>

                <Card>
                    <div className="uk-card-body uk-text-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ImgCard>
                                <img src="/images/cleanvel-logo.png" width={300} alt="" />
                            </ImgCard>

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
                            <button className="app-button uk-width-1-3">Entrar</button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
};

export default AuthForm;
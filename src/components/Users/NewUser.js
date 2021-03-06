import React from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/UsersDuck";
import UserForm from "../Forms/UserForm";

const NewUser = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        for (let key in data) {
            if (key === "profile_picture") {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        };
        dispatch(createUser(formData)).then(() => {
            UIkit.modal("#new-user").hide();
        });
    };


    return (
        <div className="uk-margin-top uk-margin-medium-right">
            <button uk-toggle="target: #new-user" type="button" className="uk-align-center uk-margin-remove-top app-button">
                <span uk-icon="icon: plus" className="uk-margin-small-right"></span>
                    Registrar nuevo usuario
            </button>

            <div id="new-user" uk-modal="true">
                <div className="uk-modal-dialog">

                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title title">Nuevo usuario</h2>
                    </div>

                    <div className="uk-modal-body">
                        <UserForm register={register} errors={errors} reset={reset} />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="form-button" type="button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser;
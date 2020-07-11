import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/UsersDuck";
import UserForm from "../Common/UserForm";

const NewUser = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        for (let key in data) {
            if (key === "profile_picture") {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        };
        dispatch(createUser(formData));
    };


    return (
        <div>
            <button uk-toggle="target: #new-user" type="button" className="uk-margin-bottom">Registrar nuevo usuario</button>

            <div id="new-user" uk-modal="true">
                <div className="uk-modal-dialog">

                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">Nuevo usuario</h2>
                    </div>

                    <div className="uk-modal-body">
                        <UserForm register={register} errors={errors}/>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button" type="button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser;
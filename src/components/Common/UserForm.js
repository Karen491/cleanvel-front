import React from "react";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`

const UserForm = ({ register, errors, preloadedValues }) => {

    return (
        <form className="uk-form-stacked uk-grid-small" uk-grid="true">
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Nombre:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        type="text"
                        name="name"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.name && <Error>Agregar usuario</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Apellido:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        type="text"
                        name="last_name"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.username && <Error>Agregar apellido</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Usuario:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        type="text"
                        name="username"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.username && <Error>Asignar un usuario</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Contraseña:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        type="password"
                        name="password"
                        placeholder="minimo de 6 caracteres "
                        ref={register({ required: true, min: 6 })}
                    />
                </div>
                {errors.password && errors.password.type === "required" && <Error>Establer contraseña</Error>}
                {errors.password && errors.password.type === "min" && <Error>La contraseña debe tener minimo 6 caracteres</Error>}
            </div>
            <div className="uk-margin uk-width-2-3">
                <label className="uk-form-label">Permisos:</label>
                <div className="uk-form-controls">
                    <select className="uk-select" name="role" ref={register({ required: true })}>
                        <option>Usuario</option>
                        <option>Administrador</option>
                    </select>
                </div>
                {errors.role && <Error>Asignar permisos</Error>}
            </div>
            <div className="uk-margin uk-width-1-3">
                <label className="uk-form-label">Foto de perfil:</label>
                <div className="uk-form-controls" uk-form-custom="true">
                    <input type="file" name="profile_picture" ref={register} />
                    <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                        Seleccionar...
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UserForm;
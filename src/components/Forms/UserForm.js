import React, { useEffect } from "react";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`

const UserForm = ({ data, errors, register, reset }) => {
    
    useEffect(() => {
        async function fetchData() {
            const result = await fetch('./api/formValues.json');
            reset(result);
        }
        fetchData();
    }, [reset])

    return (
        <form className="uk-grid-small" uk-grid="true">
            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Nombre:</label>
                <input
                    defaultValue={data ? data.name : ""}
                    className="uk-input"
                    type="text"
                    name="name"
                    ref={register({ required: true })}
                />
                {errors.name && <Error>Agregar nombre del usuario</Error>}
            </div>


            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Apellido:</label>
                <input
                    defaultValue={data ? data.last_name : ""}
                    className="uk-input"
                    type="text"
                    name="last_name"
                    ref={register({ required: true })}
                />
                {errors.last_name && <Error>El apellido es requerido</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Usuario:</label>
                <input
                    defaultValue={data ? data.username : ""}
                    className="uk-input"
                    type="text"
                    name="username"
                    ref={register({ required: true })}
                />
                {errors.username && <Error>Asignar un usuario</Error>}
            </div>

            {!data ?
                <div className="uk-width-1-2@s">
                    <label className="uk-form-label">Contraseña:</label>
                    <input
                        defaultValue={data ? data.password : ""}
                        className="uk-input"
                        type="password"
                        name="password"
                        placeholder="mínimo de 6 caracteres..."
                        ref={register({ required: "La contraseña es requerida", minLength: { value: 6, message: "La contraseña es muy corta" } })}
                    />
                    {errors.password && <Error>{errors.password.message}</Error>}
                </div>
                : null}

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Permisos:</label>
                <select
                    defaultValue={data ? data.role : ""}
                    className="uk-select"
                    name="role"
                    ref={register}
                >
                    <option value="">Selecciona el permiso...</option>
                    <option selected={data ? (data.role === "Usuario" ? "Selected" : "") : null}>Usuario</option>
                    <option selected={data ? (data.role === "Administrador" ? "Selected" : "") : null}>Administrador</option>
                </select>
                {errors.role && <Error>Especificar permisos</Error>}
            </div>

            {!data ?
                < div className="uk-width-1-2@s">
                    <label className="uk-form-label">Foto de perfil:</label><br></br>
                    <div className="js-upload" uk-form-custom="true">
                        <input type="file" name="profile_picture" ref={register} />
                        <button className="form-button" type="button" tabIndex="-1">
                            Seleccionar...
                </button>
                    </div>
                </div>
                : null}
        </form >
    )
}

export default UserForm;
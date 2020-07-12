import React, { useEffect } from "react";
import styled from "styled-components";

const Role = styled.span`
color:blue;
font-size: 15px;
`
const Error = styled.div`
color:red;
font-size: 15px;
`

const UserEditForm = ({ register, data, errors, reset }) => {

    useEffect(() => {
        async function fetchData() {
            const result = await fetch('./api/formValues.json');
            reset(result);
        }
        fetchData();
    }, [reset])

    return (
        <form className="uk-form-stacked uk-grid-small" uk-grid="true">
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Nombre:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        defaultValue={data.name}
                        placeholder={data.name}
                        type="text"
                        name="name"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.name && <Error>Agregar nombre del usuario</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Apellido:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        defaultValue={data.last_name}
                        placeholder={data.last_name}
                        type="text"
                        name="last_name"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.last_name && <Error>Agregar apellido</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Usuario:</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        defaultValue={data.username}
                        placeholder={data.username}
                        type="text"
                        name="username"
                        ref={register({ required: true })}
                    />
                </div>
                {errors.username && <Error>Agregar usuario</Error>}
            </div>
            <div className="uk-margin uk-width-1-2">
                <label className="uk-form-label">Permisos: <Role>{data.role}</Role></label>
                <div className="uk-form-controls">
                    <select className="uk-select" name="role" ref={register} defaultValue={data.role}>
                        <option>Usuario</option>
                        <option>Administrador</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default UserEditForm;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/UsersDuck";

const EditForm = ({ _id, data }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.files || e.target.value;
        setUser((prevState) => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in user) {
            if (key === "profile_picture") {
                formData.append(key, user[key][0])
            } else {
                formData.append(key, user[key]);
            }
        };
        dispatch(editUser(formData));
    };

    return (
        <div>
            <form className="uk-form-stacked uk-grid-small" uk-grid="true">
                <div className="uk-margin uk-width-1-2">
                    <label className="uk-form-label">Nombre:</label>
                    <div className="uk-form-controls">
                        <input
                            value={data.name}
                            onChange={handleChange}
                            className="uk-input"
                            type="text"
                            name="name"
                        />
                    </div>
                </div>
                <div className="uk-margin uk-width-1-2">
                    <label className="uk-form-label">Apellido:</label>
                    <div className="uk-form-controls">
                        <input
                            value={data.last_name}
                            onChange={handleChange}
                            className="uk-input"
                            type="text"
                            name="last_name"
                        />
                    </div>
                </div>
                <div className="uk-margin uk-width-1-2">
                    <label className="uk-form-label">Usuario:</label>
                    <div className="uk-form-controls">
                        <input
                            value={data.username}
                            onChange={handleChange}
                            className="uk-input"
                            type="text"
                            name="username"
                        />
                    </div>
                </div>
                <div className="uk-margin uk-width-2-3">
                    <label className="uk-form-label">Permisos:</label>
                    <div className="uk-form-controls">
                        <select className="uk-select" name="role" value={data.role} id="role" onChange={handleChange}>
                            <option>Usuario</option>
                            <option>Administrador</option>
                        </select>
                    </div>
                </div>
                <div className="uk-margin uk-width-1-3">
                    <label className="uk-form-label">Foto de perfil:</label>
                    <div className="uk-form-controls" uk-form-custom="true">
                        <input type="file" name="profile_picture" />
                        <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                            Seleccionar...
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditForm;


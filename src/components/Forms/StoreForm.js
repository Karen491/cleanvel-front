import React from "react";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`

const ProductForm = ({ register, errors, data }) => {

    return (
        <form className="uk-grid-small" uk-grid="true">
            <div className="uk-width-1-1@s">
                <label className="uk-form-label">Nombre:</label>
                <input
                    defaultValue={data.name}
                    className="uk-input"
                    type="text"
                    name="name"
                    ref={register({ required: true })}
                />
                {errors.name && <Error>Agregar el nombre de la tienda</Error>}
            </div>

            <div className="uk-width-2-3@s">
                <label className="uk-form-label">Calle:</label>
                <input
                    defaultValue={data.address.street}
                    className="uk-input"
                    type="text"
                    name="address.street"
                    ref={register({ required: true })}
                />
                {errors.address && <Error>Agregar la calle</Error>}
            </div>

            <div className="uk-width-1-3@s">
                <label className="uk-form-label">Ciudad:</label>
                <input
                    defaultValue={data.address.city}
                    className="uk-input"
                    type="text"
                    name="address.city"
                    ref={register({ required: true })}
                />
                {errors.address && <Error>Agregar la ciudad</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Estado:</label>
                <input
                    defaultValue={data.address.state}
                    className="uk-input"
                    type="text"
                    name="address.state"
                    ref={register({ required: true })}
                />
                {errors.address && <Error>Agregar el estado</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Código postal:</label>
                <input
                    defaultValue={data.address.zip_code}
                    className="uk-input"
                    type="number"
                    name="address.zip_code"
                    ref={register({ required: true })}
                />
                {errors.address && <Error>Agregar el código postal</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">País:</label>
                <input
                    defaultValue={data.address.country}
                    className="uk-input"
                    type="text"
                    name="address.country"
                    ref={register({ required: true })}
                />
                {errors.address && <Error>Agregar el país</Error>}
            </div>

            
            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Teléfono:</label>
                <input
                    defaultValue={data.phone_number}
                    className="uk-input"
                    type="number"
                    name="phone_number"
                    ref={register({ required: true })}
                />
                {errors.phone_number && <Error>Agregar el teléfono</Error>}
            </div>
        </form>
    )
}

export default ProductForm;
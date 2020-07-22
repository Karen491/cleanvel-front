import React from "react";

const TotalSaleForm = ({ register, errors, handleSubmit, data }) => {

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
                {errors.name && <Error>Agregar nombre del producto</Error>}
            </div>

            <div className="uk-width-1-2">
                <button className="app-button" onClick={handleSubmit}>+ Generar</button>
            </div>
        </form>
    )
}

export default TotalSaleForm;
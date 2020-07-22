import React from "react";

const SaleForm = ({ register, errors, handleSubmit }) => {

    return (
        <form className="uk-grid-small" uk-grid="true">
            <div className="uk-width-1-2">
                <select
                    className="uk-select"
                    ref={register({ required: true })}
                    name="store"
                >
                    <option value="">Selecciona una tienda...</option>
                    <option value="libertad">Libertad</option>
                    <option value="ciudad_judicial">Ciudad Judicial</option>
                </select>
                {errors.store && <p className="error uk-margin-remove-top">Seleccionar tienda</p>}
            </div>

            <div className="uk-width-1-2">
                <button className="app-button" onClick={handleSubmit}>+ Generar</button>
            </div>
        </form>
    )
}

export default SaleForm;
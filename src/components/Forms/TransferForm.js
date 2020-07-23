import React from "react";

const TransferForm = ({ register, errors, watch, handleSubmit }) => {
    const origin = watch("origin");

    return (
        <form className="uk-grid-small" uk-grid="true">
            <div className="uk-width-1-3">
                <select
                    className="uk-select"
                    ref={register({ required: true })}
                    name="origin"
                >
                    <option value="">Tienda de origen...</option>
                    <option value="warehouse">Almacén</option>
                    <option value="ciudad_judicial">Ciudad Judicial</option>
                </select>
                {errors.origin && <p className="error uk-margin-remove-top">Seleccionar tienda de origen</p>}
            </div>

            {
                origin === "warehouse" &&
                <div className="uk-width-1-3">
                    <select
                        className="uk-select"
                        ref={register({ required: true })}
                        name="destination"
                    >
                        <option value="">Tienda de destino...</option>
                        <option value="libertad">Libertad</option>
                        <option value="ciudad_judicial">Ciudad Judicial</option>
                    </select>
                    {errors.destination && <p className="error uk-margin-remove-top">Seleccionar tienda de destino</p>}
                </div>
            }

            {
                origin === "ciudad_judicial" &&
                <div className="uk-width-1-3">
                    <select
                        className="uk-select"
                        ref={register({ required: true })}
                        name="destination"
                    >
                        <option value="">Tienda de destino...</option>
                        <option value="libertad">Libertad</option>
                    </select>
                    {errors.destination && <p className="error uk-margin-remove-top">Seleccionar tienda de destino</p>}
                </div>
            }
            <div className="uk-width-1-3">
                <button className="app-button" onClick={handleSubmit}>+ Generar</button>
            </div>

        </form>
    )
}

export default TransferForm;
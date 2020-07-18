import React, { useEffect } from "react";
import styled from "styled-components";

const Error = styled.div`
color:red;
font-size: 15px;
`
const Select = styled.span`
color:blue;
font-size: 15px;
`

const ProductForm = ({ register, errors, data, reset }) => {

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
                {errors.name && <Error>Agregar nombre del producto</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Categoría: {data ? <Select>{data.category}</Select> : null}</label>
                <select
                    defaultValue={data ? data.category : ""}
                    className="uk-select"
                    name="category"
                    ref={register({ required: true })}
                >
                    <option value="">Selecciona la categoría...</option>
                    <option>Desechables</option>
                    <option>General</option>
                    <option>Jarciería</option>
                    <option>Otros</option>
                    <option>Papel</option>
                    <option>Químico</option>
                    <option>Varios</option>
                </select>
                {errors.category && <Error>Seleccionar la categoría</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Disponibilidad: {data ? <Select>{data.availability}</Select> : null}</label>
                <select
                    defaultValue={data ? data.availability : ""}
                    className="uk-select"
                    name="availability"
                    ref={register({ required: true })}
                >
                    <option value="">Selecciona la disponibilidad...</option>
                    <option>Ciudad Judicial</option>
                    <option>Libertad</option>
                    <option>Todas las tiendas</option>
                </select>
                {errors.availability && <Error>Seleccionar la disponibilidad</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Margen mínimo:</label>
                <input
                    defaultValue={data ? data.minumum : ""}
                    className="uk-input"
                    type="number"
                    name="minumum"
                    ref={register({ required: true })}
                />
                {errors.minumum && <Error>Especificar el margen mínimo</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Precio de compra:</label>
                <input
                    defaultValue={data ? data.purchase_price : ""}
                    className="uk-input"
                    type="number"
                    name="purchase_price"
                    ref={register({ required: true })}
                />
                {errors.purchase_price && <Error>Especificar el precio de compra</Error>}
            </div>

            <div className="uk-width-1-2@s">
                <label className="uk-form-label">Precio de venta:</label>
                <input
                    defaultValue={data ? data.sale_price : ""}
                    className="uk-input"
                    type="number"
                    name="sale_price"
                    ref={register({ required: true })}
                />
                {errors.sale_price && <Error>Especificar el precio de venta</Error>}
            </div>

            {!data ?
                <div className="uk-width-1-3@s">
                    <label className="uk-form-label">Cantidad: Almacén</label>
                    <input
                        className="uk-input"
                        type="number"
                        name="quantity.warehouse"
                        ref={register} defaultValue={0}
                    />
                </div>
                : null}

            {!data ?
                <div className="uk-width-1-3@s">
                    <label className="uk-form-label">Cantidad: Libertad</label>
                    <input
                        className="uk-input"
                        type="number"
                        name="quantity.libertad"
                        ref={register} defaultValue={0}
                    />
                </div>
                : null}

            {!data ?
                <div className="uk-width-1-3@s">
                    <label className="uk-form-label">Cantidad: Ciudad Judicial</label>
                    <input
                        className="uk-input"
                        type="number"
                        name="quantity.ciudad_judicial"
                        ref={register} defaultValue={0}
                    />
                </div>
                : null}

        </form>
    )
}

export default ProductForm;

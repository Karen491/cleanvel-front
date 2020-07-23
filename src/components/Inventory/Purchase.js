import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addPurchase } from "../../redux/ProductsDuck";
import { denormalizeData, sortData } from "../../utils/formatters";
import RouteTitle from "../Common/RouteTitle";
import styled from "styled-components";

const Input = styled.input`
border: 1px solid #DB9305;

:focus {
    outline-color: green;
  }
`

const Purchase = () => {
    const dispatch = useDispatch();
    let [searchValue, setSearchValue] = useState();
    let products = useSelector(state => state.products.products);
    products = sortData(denormalizeData(products));

    products = !searchValue ? products : products.filter(product => product.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));

    const handleChange = (e) => {
        let { value } = e.target;
        setSearchValue(value);
    }

    const { register, handleSubmit, watch } = useForm();

    const onSubmit = (data) => {
        const list = denormalizeData(data).filter(item => item.purchase > 0);
        list.map((product) => {
            const id = product.id;
            const purchase = parseFloat(product.purchase);
            const price = parseFloat(product.price);
            const params = { id, data: { purchase, price } };
            dispatch(addPurchase(params)).then(() => {
                document.location.reload(true);
            })
            return params;
        })
    }


    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <RouteTitle title="Inventario CleanVel: Registrar compra" img="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1595050577/cleanvel/App%20pictures/inventory_tivarg.png" />

                <div className="uk-margin-medium-top uk-margin-right">
                    <Link to="/inventario" className="nav-user-icon">
                        <span className="nav-user-icon" uk-icon="icon: chevron-left"></span>
                        Regresar
                    </Link>
                </div>
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-inline uk-margin-large-left uk-width-1-2">
                <span className="uk-form-icon" uk-icon="icon: search"></span>
                <input className="uk-input" type="text" placeholder="Buscar producto..." onChange={handleChange} />
            </div>

            <div className="uk-flex">
                <div className="uk-overflow-auto uk-height-large uk-margin-large-right uk-margin-large-left uk-margin-small-top uk-width-3-4">
                    <table className="uk-table uk-table-striped">
                        <thead>
                            <tr>
                                <td className="table-head">Nombre</td>
                                <td className="table-head uk-text-center">Margen mínimo</td>
                                <td className="table-head uk-text-center">Existencias</td>
                                <td className="table-head uk-text-center">Compras</td>
                                <td className="table-head uk-text-center">Precio de compra</td>
                                <td className="table-head uk-text-center">Subtotal</td>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="table-cell">{product.name}</td>
                                    <td className="table-cell uk-text-center">{product.minumum}</td>
                                    <td className="table-cell uk-text-center">{product.totals.total_quantity}</td>
                                    <td className="uk-flex">
                                        <div>
                                            <input
                                                className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                type="hidden"
                                                name={`${index}.id`}
                                                ref={register}
                                                value={product._id}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                className="table-cell uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                defaultValue={0}
                                                type="number"
                                                name={`${index}.purchase`}
                                                ref={register}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Input
                                            className="table-cell uk-text-right uk-width-1-2 uk-align-center"
                                            defaultValue={(product.purchase_price).toFixed(2)}
                                            type="number"
                                            name={`${index}.price`}
                                            ref={register}
                                        />
                                    </td>
                                    <td className="table-cell uk-text-center">
                                        ${(watch(`${index}.purchase`, 0) * watch(`${index}.price`, product.purchase_price)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="uk-margin-top uk-text-center">
                    <button className="app-button" onClick={handleSubmit(onSubmit)}> + Agregar compra</button>
                </div>
            </div>

        </div>
    )
};

export default Purchase;
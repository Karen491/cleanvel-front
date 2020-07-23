import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { denormalizeData, sortData, currencyFormat } from "../../utils/formatters";
import styled from "styled-components";

const TableTitle = styled.h3`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
`

const Text = styled.h6`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
`

const Value = styled.span`
color: red;
`

const ProductDetail = () => {
    let [searchValue, setSearchValue] = useState();
    let products = useSelector(state => state.products.products);
    products = sortData(denormalizeData(products));

    products = !searchValue ? products : products.filter(product => product.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));

    const handleChange = (e) => {
        let { value } = e.target;
        setSearchValue(value);
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <TableTitle className="uk-margin-top uk-text-capitalize">
                    <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1594630398/cleanvel/App%20pictures/products-icon_bwgtqa.png" alt="" width={60} /></span>
                    Productos Cleanvel: Inventario
                </TableTitle>

                <div className="uk-card uk-card-small uk-card-body uk-margin-small-top">
                    <Text className="uk-card-title">En existencia: {products.reduce((acc, product) => (
                        acc + product.totals.total_quantity
                    ), 0)}
                    </Text>
                </div>
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-text-right uk-margin-large-right uk-margin-top uk-flex uk-flex-around uk-flex-middle">
                <div className="uk-inline uk-margin-top uk-margin-large-left uk-width-1-2">
                    <span className="uk-form-icon" uk-icon="icon: search"></span>
                    <input className="uk-input" type="text" placeholder="Buscar producto..." onChange={handleChange} />
                </div>

                <div>
                    <Link to="/inventario" className="nav-user-icon">
                        <span className="nav-user-icon" uk-icon="icon: chevron-left"></span>
                        Regresar
                    </Link>
                </div>
            </div>

            <div className="uk-overflow-auto uk-height-large uk-margin-large-right uk-margin-large-left uk-margin-small-top">
                <table className="uk-table uk-table-striped">
                    <thead>
                        <tr>
                            <td className="table-head">Nombre</td>
                            <td className="table-head">Categoría</td>
                            <td className="table-head uk-text-center">Almacén</td>
                            <td className="table-head uk-text-center">Libertad</td>
                            <td className="table-head uk-text-center">Ciudad Judicial</td>
                            <td className="table-head uk-text-center">Cantidad Total</td>
                            <td className="table-head uk-text-center">Valor en Inventario</td>
                            {/* {isAdmin &&
                                <td className="table-head uk-text-center">Acciones</td>
                            } */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="table-cell">{product.name}</td>
                                <td className="table-cell">{product.category}</td>
                                <td className="table-cell">
                                    <div className="uk-flex uk-flex-between uk-margin-right uk-margin-left">
                                        <span className="uk-text-left">{product.quantity.warehouse}</span>
                                        <Value className="uk-text-right">{currencyFormat(product.inventory_value.warehouse)}</Value>
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="uk-flex uk-flex-between uk-margin-right uk-margin-left">
                                        <span className="uk-text-left">{product.quantity.ciudad_judicial}</span>
                                        <Value className="uk-text-right">{currencyFormat(product.inventory_value.ciudad_judicial)}</Value>
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="uk-flex uk-flex-between uk-margin-right uk-margin-left">
                                        <span className="uk-text-left">{product.quantity.libertad}</span>
                                        <Value className="uk-text-right">{currencyFormat(product.inventory_value.libertad)}</Value>
                                    </div>
                                </td>
                                <td className="table-cell uk-text-center">{product.totals.total_quantity}</td>
                                <td className="table-cell uk-text-center">{currencyFormat(product.totals.inventory_value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ProductDetail;
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { denormalizeData, sortData } from "../../utils/formatters";
import styled from "styled-components";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const TableTitle = styled.h3`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
`

const Text = styled.h6`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
`

const ProductsTable = () => {
    const filter = useLocation().pathname.substring(11);
    const products = useSelector(state => state.products.products);
    let data = [];

    if (filter === "todos") {
        data = sortData(denormalizeData(products));
    } else {
        data = sortData(denormalizeData(products).filter(product => product.category.toLowerCase() === filter));
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <TableTitle className="uk-margin-top uk-text-capitalize">
                    <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1594630398/cleanvel/App%20pictures/products-icon_bwgtqa.png" alt="" width={60} /></span>
                    Productos Cleanvel: {filter === "químico" ? "Químicos" : filter}
                </TableTitle>

                <div className="uk-card uk-card-small uk-card-body uk-margin-small-top">
                    <Text className="uk-card-title">En existencia: {data.reduce((acc, product) => (
                        acc + product.totals.total_quantity
                    ), 0)}
                    </Text>
                </div>
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-text-right uk-margin-large-right uk-margin-top">
                <Link to="/productos" className="nav-user-icon">
                    <span className="nav-user-icon" uk-icon="icon: chevron-left"></span>
                    Regresar
                </Link>
            </div>

            <div className="uk-overflow-auto uk-height-large uk-margin-large-right uk-margin-large-left uk-margin-small-top">
                <table className="uk-table uk-table-striped">
                    <thead>
                        <tr>
                            <td className="table-head">Nombre</td>
                            <td className="table-head">Categoría</td>
                            <td className="table-head uk-text-center">Disponibilidad</td>
                            <td className="table-head uk-text-center">Margen mínimo</td>
                            <td className="table-head uk-text-center">Precio de compra</td>
                            <td className="table-head uk-text-center">Precio de venta</td>
                            <td className="table-head uk-text-center">Margen de ganancia</td>
                            <td className="table-head uk-text-center">Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <td className="table-cell">{product.name}</td>
                                <td className="table-cell">{product.category}</td>
                                <td className="table-cell uk-text-capitalize uk-text-center">
                                    {product.availability === "all" ? "Todas" : product.availability === "ciudad_judicial" ? "Ciudad Judicial" : product.availability}
                                </td>
                                <td className="table-cell uk-text-center">{product.minumum}</td>
                                <td className="table-cell uk-text-center">{product.purchase_price}</td>
                                <td className="table-cell uk-text-center">{product.sale_price}</td>
                                <td className="table-cell uk-text-center">{product.profit}</td>
                                <td>
                                    <div className="uk-flex">
                                        <EditProduct id={product._id} />
                                        <DeleteProduct id={product._id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ProductsTable;
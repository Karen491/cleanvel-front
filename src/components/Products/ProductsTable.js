import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/ProductsDuck";
import { denormalizeData } from "../../utils/formatters";
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

const TableHead = styled.td`
position: sticky;
top: 0; 
background-color: #174758;
color: #FEFFFF;
text-transform: capitalize;
font-size: 16px;
`

const TableCell = styled.td`
font-family: Verdana, Geneva, Tahoma, sans-serif;
color: rgb(82, 82, 82);
font-size: 12px;
`

const ProductsTable = () => {
    const dispatch = useDispatch();
    const filter = useLocation().pathname.substring(11);
    const products = useSelector(state => state.products.products);
    let data = [];
    //let inventory_value = 0;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (filter === "todos") {
        data = denormalizeData(products);
    } else {
        data = denormalizeData(products).filter(product => product.category.toLowerCase() === filter);
    }

    data = data.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return 1
        } else if (nameA < nameB) {
            return -1;
        }
        return data;
    })

    // inventory_value = data.reduce((acc, product) => {
    //     return acc + product.totals.inventory_value;
    // }, 0)

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <TableTitle className="uk-margin-top uk-text-capitalize">
                    <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1594630398/cleanvel/App%20pictures/products-icon_bwgtqa.png" alt="" width={60} /></span>
                    Productos Cleanvel: {filter === "químico" ? "Químicos" : filter}
                </TableTitle>

                <div className="uk-card uk-card-small uk-card-body uk-margin-small-top">
                    <Text className="uk-card-title">{`En existencia: ${data.length}`}</Text>
                </div>        
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-overflow-auto uk-height-large uk-margin-large-right uk-margin-large-left uk-margin-small-top">
                <table className="uk-table uk-table-striped">
                    <thead>
                        <tr>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead className="uk-text-center">Disponibilidad</TableHead>
                            <TableHead className="uk-text-center">Margen mínimo</TableHead>
                            <TableHead className="uk-text-center">Precio de compra</TableHead>
                            <TableHead className="uk-text-center">Precio de venta</TableHead>
                            <TableHead className="uk-text-center">Margen de ganancia</TableHead>
                            <TableHead className="uk-text-center">Acciones</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.availability}</TableCell>
                                <TableCell className="uk-text-center">{product.minumum}</TableCell>
                                <TableCell className="uk-text-center">{product.purchase_price}</TableCell>
                                <TableCell className="uk-text-center">{product.sale_price}</TableCell>
                                <TableCell className="uk-text-center">{product.profit}</TableCell>
                                <TableCell>
                                    <div className="uk-flex">
                                        <EditProduct id={product._id} />
                                        <DeleteProduct id={product._id} />
                                    </div>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="go-back uk-text-right uk-margin-large-right uk-margin-top">
                <Link to="/productos" className="nav-user-icon">
                    <span className="nav-user-icon" uk-icon="icon: chevron-left"></span>
                    Regresar
                </Link>
            </div>
        </div>
    )
};

export default ProductsTable;
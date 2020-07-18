import React from "react";
import ProductCard from "../Common/ProductCard";
import styled from "styled-components";
import NewProduct from "./NewProduct";

const TableTitle = styled.h3`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
`

const Products = () => {
    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <TableTitle className="uk-margin-top">
                    <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1594630398/cleanvel/App%20pictures/products-icon_bwgtqa.png" alt="" width={60} /></span>
                    Productos Cleanvel
                </TableTitle>

                <NewProduct />
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-child-width-1-3@s uk-margin-medium-top uk-margin-left uk-margin-right uk-text-center" uk-grid="true">
                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1594936545/cleanvel/todos_bos3r4.png"
                        title="Todos"
                        to="/productos/todos"
                    />
                </div>

                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1594937045/cleanvel/chemical_ytj8wh.png"
                        title="Químicos"
                        to="/productos/químico"
                    />
                </div>

                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1594937367/cleanvel/sponge_jrzchy.png"
                        title="Jarciería"
                        to="/productos/jarciería"
                    />
                </div>

                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1594937563/cleanvel/App%20pictures/paper-products_lwpa4e.png"
                        title="Papel"
                        to="/productos/papel"
                    />
                </div>

                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1595003290/cleanvel/App%20pictures/glass_m89ngr.png"
                        title="Desechables"
                        to="/productos/desechables"
                    />
                </div>

                <div>
                    <ProductCard
                        image="https://res.cloudinary.com/karen491/image/upload/c_scale,h_180,w_180/v1595005362/cleanvel/App%20pictures/spray_fdoxcx.png"
                        title="General"
                        to="/productos/general"
                    />
                </div>

            </div>
        </div>
    )
}

export default Products;
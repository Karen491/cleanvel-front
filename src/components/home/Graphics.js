import React from "react";
import { useSelector } from "react-redux";
import { denormalizeData, currencyFormat } from "../../utils/formatters";
import ProductGraph from "../Graphs/ProductGraph";
import CategoryGraph from "../Graphs/CategoryGraph";
import styled from 'styled-components'

const Title = styled.p`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
font-size: 30px;
`

const Card = styled.div`
text-align: center;
padding-top: 10px;
border: 1px solid gray;
color: #FEFFFF;
background-color: #25424dd0;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 20px;
`

const Graphics = () => {
    const products = useSelector(state => state.products.products);

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-margin-large-left uk-padding-remove-bottom uk-flex uk-flex-around">
                <Title className="uk-margin-top">Cleanvel Puebla</Title>
                <img src="images/cleanvel-logo.png" width={290} alt="" />
            </div>
            <hr className="uk-margin-remove-top divider uk-margin-bottom"></hr>

            <div className="uk-child-width-expand@s uk-margin-small-left uk-margin-medium-right uk-margin-medium-top" uk-grid="true">
                <div>
                    <ProductGraph />
                </div>

                <div>
                    <CategoryGraph />
                </div>
            </div>

            <div className="uk-flex uk-margin-top uk-flex-center">
                <Card className="uk-margin-xlarge-left uk-margin-medium-top uk-margin-bottom uk-width-1-4">
                    Inventario - Valor Total:
                        <p>{currencyFormat(
                    denormalizeData(products).reduce((acc, product) => {
                        return acc + product.totals.inventory_value;
                    }, 0))}
                    </p>
                </Card>
            </div>
        </div>
    )
};

export default Graphics;
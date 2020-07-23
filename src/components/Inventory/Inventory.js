import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { denormalizeData, currencyFormat } from "../../utils/formatters";
import RouteTitle from "../Common/RouteTitle";
import StoreGraph from "../Graphs/StoreGraph";
import ShortageProducts from "./ShortageProducts";
import styled from 'styled-components'

const Card = styled.div`
border: 1px solid gray;
color: #FEFFFF;
background-color: #25424dd0;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 17px;
`

const Inventory = () => {
    const products = useSelector(state => state.products.products);

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <RouteTitle title="Inventario Cleanvel" img="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1595050577/cleanvel/App%20pictures/inventory_tivarg.png" />

                <div className="uk-inline uk-margin-top uk-margin-large-right">
                    <button className="app-button" type="button">
                        <span className="uk-margin-small-right" uk-icon="icon: cog"></span>
                        Herramientas
                    </button>

                    <div className="profile-card" uk-dropdown="pos: bottom-left">
                        <ul className="uk-nav uk-dropdown-nav">
                            <li><Link to="/inventario/detalle"><span className="nav-text">Inventario</span></Link></li>
                            <li><Link to="/inventario/compra"><span className="nav-text">Agregar a stock</span></Link></li>
                            <li><Link to="/inventario/traspaso"><span className="nav-text">Traspaso</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="uk-margin-remove-top divider"></hr>


            <div className="uk-child-width-expand@s uk-text-center uk-margin-top uk-margin-left uk-margin-right" uk-grid="true">
                <div>
                    <Card className="uk-card uk-card-small uk-card-default uk-card-body test-font">
                        Total:
                        <p>{currencyFormat(
                        denormalizeData(products).reduce((acc, product) => {
                            return acc + product.totals.inventory_value;
                        }, 0))}
                        </p>
                    </Card>
                </div>

                <div>
                    <Card className="uk-card uk-card-small uk-card-default uk-card-body">
                        Almacén:
                        <p>{currencyFormat(
                        denormalizeData(products).reduce((acc, product) => {
                            return acc + product.inventory_value.warehouse;
                        }, 0))}
                        </p>
                    </Card>
                </div>


                <div>
                    <Card className="uk-card uk-card-small uk-card-default uk-card-body">
                        Libertad:
                        <p>{currencyFormat(
                        denormalizeData(products).reduce((acc, product) => {
                            return acc + product.inventory_value.libertad;
                        }, 0))}
                        </p>
                    </Card>
                </div>

                <div className="">
                    <Card className="uk-card uk-card-small uk-card-body">
                        Ciudad Judicial:
                        <p>{currencyFormat(
                        denormalizeData(products).reduce((acc, product) => {
                            return acc + product.inventory_value.ciudad_judicial;
                        }, 0))}
                        </p>
                    </Card>
                </div>
            </div>

            <div className="uk-child-width-expand@s uk-height-large uk-margin-medium-right uk-margin-large-top" uk-grid="true">
                <div>
                    <StoreGraph />
                </div>

                <div>
                    <ShortageProducts />
                </div>
            </div>

        </div>
    )
}

export default Inventory;
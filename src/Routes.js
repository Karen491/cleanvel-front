import React from "react";
import { Switch, Route } from "react-router-dom";
import Graphics from "./components/Home/Graphics";
import Inventory from "./components/Inventory/Inventory";
import ProductDetail from "./components/Inventory/ProductDetail";
import Purchase from "./components/Inventory/Purchase";
import Transfer from "./components/Inventory/Transfer";
import Products from "./components/Products/Products";
import ProductsTable from "./components/Products/ProductsTable";
import Sales from "./components/Sales/Sales";
import Stores from "./components/Stores/Stores";
import UsersTable from "./components/Users/UsersTable";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Graphics} />
        <Route exact path="/inventario" component={Inventory} />
        <Route exact path="/inventario/detalle" component={ProductDetail} />
        <Route exact path="/inventario/compra" component={Purchase} />
        <Route exact path="/inventario/traspaso" component={Transfer} />
        <Route exact path="/productos" component={Products} />
        <Route exact path="/productos/:id" component={ProductsTable} />
        <Route exact path="/ventas" component={Sales} />
        <Route exact path="/tiendas" component={Stores} />
        <Route exact path="/usuarios" component={UsersTable} />
    </Switch>
);

export default Routes;
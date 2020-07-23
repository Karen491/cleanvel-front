import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersTable from "./components/Users/UsersTable";
import Products from "./components/Products/Products";
import Inventory from "./components/Inventory/Inventory";
import Stores from "./components/Stores/Stores";
import ProductsTable from "./components/Products/ProductsTable";
import Purchase from "./components/Inventory/Purchase";
import Transfer from "./components/Inventory/Transfer"
import Sales from "./components/Sales/Sales";

const Routes = () => (
    <Switch>
        <Route exact path="/usuarios" component={UsersTable} />
        <Route exact path="/inventario" component={Inventory} />
        <Route exact path="/inventario/compra" component={Purchase} />
        <Route exact path="/inventario/traspaso" component={Transfer} />
        <Route exact path="/tiendas" component={Stores} />
        <Route exact path="/productos" component={Products} />
        <Route exact path="/productos/:id" component={ProductsTable} />
        <Route exact path="/ventas" component={Sales} />
    </Switch>
);

export default Routes;
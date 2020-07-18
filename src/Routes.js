import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersTable from "./components/Users/UsersTable";
import Products from "./components/Products/Products";
import Inventory from "./components/Inventory/Inventory";
import Directory from "./components/Stores/Stores";
import ProductsTable from "./components/Products/ProductsTable";
import Profile from "./components/Home/Profile";

const Routes = () => (
    <Switch>
        <Route exact path="/usuarios" component={UsersTable} />
        <Route exact path="/inventario" component={Inventory} />
        <Route exact path="/tiendas" component={Directory} />
        <Route exact path="/productos" component={Products} />
        <Route exact path="/productos/:id" component={ProductsTable} />
        <Route exact path="/perfil" component={Profile} />
    </Switch>
);

export default Routes;
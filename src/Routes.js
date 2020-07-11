import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersTable from "./components/Users/UsersTable";


const Routes = () => (
    <Switch>
        <Route exact path="/usuarios" component={UsersTable} />
    </Switch>
);

export default Routes;
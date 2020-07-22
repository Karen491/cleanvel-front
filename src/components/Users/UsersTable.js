import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/UsersDuck";
import { denormalizeData } from "../../utils/formatters";
import RouteTitle from "../Common/RouteTitle";
import NewUser from "./NewUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import dayjs from "dayjs";
import "dayjs/locale/es"
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left">
                <RouteTitle title="Usuarios Cleanvel" img="https://res.cloudinary.com/karen491/image/upload/v1594704536/cleanvel/App%20pictures/users-icon_jclhbc.png"/>
                <NewUser />
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-margin-medium-top uk-margin-large-left">
                <table className="uk-table uk-table-divider uk-width-3-4@m uk-margin-left">
                    <thead>
                        <tr>
                            <td className="table-head uk-padding-remove-right">Usuario</td>
                            <td className="table-head uk-text-center">Permisos</td>
                            <td className="table-head uk-text-center">Activo desde</td>
                            <td className="table-head uk-text-center">Acciones</td>
                        </tr>
                    </thead>

                    <tbody>
                        {denormalizeData(users).map((user, index) => (
                            <tr key={index}>
                                <td className="table-cell uk-padding-remove-right">
                                    <p className="uk-margin-remove-bottom">{user.name} {user.last_name}</p>
                                    <p className="uk-margin-remove-top">{user.username}</p>
                                </td>
                                <td className="table-cell uk-text-center">{user.role}</td>
                                <td className="table-cell uk-text-center">{dayjs(user.createdAt).locale("es").format("MMMM YYYY")}</td>
                                <td>
                                    <div className="uk-flex uk-flex-center	">
                                        <EditUser {...user} />
                                        <DeleteUser {...user} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UsersTable;
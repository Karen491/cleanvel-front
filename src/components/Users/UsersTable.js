import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/UsersDuck";
import { denormalizeData } from "../../utils/formatters";
import NewUser from "./NewUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/es"
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const TableTitle = styled.h3`
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
color: #17252A;
font-weight: 600;
`

const TableHead = styled.td`
background-color: #174758;
color: #FEFFFF;
text-transform: capitalize;
font-size: 18px;
font-weight: 500;
`

const TableCell = styled.td`
font-family: Verdana, Geneva, Tahoma, sans-serif;
color: rgb(80, 80, 80);
font-size: 14px;
`

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="uk-margin-large-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-left">
                <TableTitle className="uk-margin-top">
                    <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/v1594704536/cleanvel/App%20pictures/users-icon_jclhbc.png" alt="" width={60} /></span>
                    Usuarios Cleanvel
                </TableTitle>

                <NewUser />
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-margin-medium-top">
                <table className="uk-table uk-table-divider uk-width-3-4@m uk-margin-left">
                    <thead>
                        <tr>
                            <TableHead className="uk-padding-remove-right">Usuario</TableHead>
                            <TableHead className="uk-text-center">Permisos</TableHead>
                            <TableHead className="uk-text-center">Activo desde</TableHead>
                            <TableHead className="uk-text-center">Acciones</TableHead>
                        </tr>
                    </thead>

                    <tbody>
                        {denormalizeData(users).map((user, index) => (
                            <tr key={index}>
                                <TableCell className="uk-padding-remove-right">
                                    <p className="uk-margin-remove-bottom">{user.name} {user.last_name}</p>
                                    <p className="uk-margin-remove-top">{user.username}</p>
                                </TableCell>
                                <TableCell className="uk-text-center">{user.role}</TableCell>
                                <TableCell className="uk-text-center">{dayjs(user.createdAt).locale("es").format("MMMM YYYY")}</TableCell>
                                <TableCell>
                                    <div className="uk-flex uk-flex-center	">
                                        <EditUser {...user} />
                                        <DeleteUser {...user} />
                                    </div>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UsersTable;
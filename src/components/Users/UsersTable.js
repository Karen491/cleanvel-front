import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../redux/UsersDuck";
import { denormalizeData } from "../../utils/formatters";
import TableCard from "./TableCard";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/es"
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

const UserPicture = styled.img`
width: 40px;
height: 40px;
border-radius: 40%;
`

const TableBorder = styled.table`
border: 2px solid rgb(214, 207, 207); 
`

const TableTitle = styled.h2`
color: rgb(8, 4, 46);
`

const TableHead = styled.td`
color: rgb(15, 82, 9);
border: 1px solid rgb(214, 207, 207);
text-transform: capitalize;
font-size: 18px;
font-weight: 500;
`

const TableCell = styled.td`
border: 1px solid rgb(214, 207, 207);
`

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="uk-flex-middle uk-margin-top" uk-grid="true">
            <TableCard />
            <div className="uk-width-2-3@m uk-height-large" uk-overflow-auto="true">
                <TableBorder className="uk-table uk-table-divider">
                    <caption className="uk-margin-right">
                        <TableTitle className="uk-text-center">
                            <span><img className="uk-margin-small-right" src="https://res.cloudinary.com/karen491/image/upload/v1594177958/cleanvel/App%20pictures/users-icon_bihpzi.png" alt="" width={60} /></span>
                                Usuarios Cleanvel
                            </TableTitle>
                    </caption>
                    <thead>
                        <tr>
                            <th className="uk-text-center"><span uk-icon="grid"></span></th>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Permisos</TableHead>
                            <TableHead>Activo desde</TableHead>
                            <TableHead>Acciones</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {denormalizeData(users).map((user, index) => (
                            <tr key={index}>
                                <TableCell><UserPicture className="uk-preserve-width" src={user.profile_picture} alt=""></UserPicture></TableCell>
                                <TableCell>{user.name} {user.last_name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{dayjs(user.createdAt).locale("es").format("MMMM YYYY")}</TableCell>
                                <td className="uk-flex">
                                    <EditUser {...user} />
                                    <DeleteUser {...user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </TableBorder>
            </div>
        </div>
    )
}

export default UsersTable;
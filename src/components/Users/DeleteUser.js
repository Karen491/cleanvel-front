import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, deleteUser } from "../../redux/UsersDuck";
import styled from "styled-components";

const Text = styled.p`
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 16px;
color: rgb(80, 80, 80);
`

const DeleteUser = ({ _id }) => {
    const dispatch = useDispatch();
    const editableUser = useSelector(state => state.users.editableUser);

    const handleClick = () => {
        dispatch(searchUser(_id));
    };

    const handleDelete = (id) => {
        id = editableUser._id;
        dispatch(deleteUser(id));
    }

    return (
        <div>
            <button uk-toggle="target: #delete-warning" href="/usuarios" className="uk-icon-button" uk-icon="trash" type="button" onClick={handleClick}></button>

            <div id="delete-warning" uk-modal="true">
                {editableUser &&
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>

                        <div className="uk-modal-header">
                            <h2 className="uk-modal-title title">{editableUser.name} {editableUser.last_name}</h2>
                        </div>

                        <div className="uk-modal-body uk-flex">
                            <div className="uk-margin-right"><span className="delete-icon" uk-icon="icon: warning; ratio: 3"></span></div>
                            <div><Text>¿Estas seguro que deseas eliminar a este usuario de la base de datos?</Text></div>
                        </div>

                        <div className="uk-modal-footer uk-text-right">
                            <button className="form-button uk-modal-close" onClick={handleDelete}>Eliminar usuario</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DeleteUser;
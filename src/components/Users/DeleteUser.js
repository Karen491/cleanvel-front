import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, deleteUser } from "../../redux/UsersDuck";

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
                {editableUser ?
                    <div className="uk-modal-dialog uk-modal-body">
                        <h4><span uk-icon="icon: warning; ratio: 3"></span>
                            {`¿Estas seguro que deseas eliminar a ${editableUser.name} ${editableUser.last_name} de la base de datos?`}
                        </h4>
                        <hr></hr>
                        <p className="uk-text-right">
                            <button className="button-nb uk-modal-close" type="button">Cancelar</button>
                            <button className="button uk-modal-close" type="button" onClick={handleDelete}>
                                Eliminar usuario
                            </button>
                        </p>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default DeleteUser;
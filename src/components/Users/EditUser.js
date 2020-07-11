import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../redux/UsersDuck";
import EditForm from "../Common/EditForm";

const EditUser = ({ _id }) => {
    const dispatch = useDispatch();
    const editableUser = useSelector(state => state.users.editableUser);

    const handleClick = () => {
        dispatch(searchUser(_id));
    };

    return (
        <div>
            <a uk-toggle="target: #edit-warning" href="/usuarios" className="uk-icon-button" uk-icon="file-edit" type="button" onClick={handleClick}></a>

            <div id="edit-warning" uk-modal="true">
                {editableUser ?
                    <div className="uk-modal-dialog uk-modal-body">
                        <h4><span uk-icon="icon: warning; ratio: 3"></span>
                            {editableUser.name} {editableUser.last_name}
                        </h4>
                        <div>
                            <button className="uk-button uk-button-default" type="button" uk-toggle="target: #toggle-usage">Editar</button>
                            <div id="toggle-usage" hidden>
                                <EditForm data={editableUser} _id={_id}/>
                            </div>
                        </div>
                        <hr></hr>
                        <p className="uk-text-right">
                            <button className="button-nb uk-modal-close" type="button">Cancelar</button>
                        </p>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default EditUser;


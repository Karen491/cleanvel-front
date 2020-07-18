import React from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, editUser } from "../../redux/UsersDuck";
import UserForm from "../Forms/UserForm";

const EditUser = ({ _id }) => {
    const dispatch = useDispatch();
    const editableUser = useSelector(state => state.users.editableUser);
    const { register, handleSubmit, errors, reset } = useForm();

    const handleClick = () => {
        dispatch(searchUser(_id));
    };

    const onSubmit = (data) => {
        const id = editableUser._id;
        const params = { id, data }
        dispatch(editUser(params)).then(() => {
            UIkit.modal("#edit-user").hide();
        })
    };

    return (
        <div>
            <button uk-toggle="target: #edit-user" className="uk-icon-button uk-margin-small-right" uk-icon="file-edit" type="button" onClick={handleClick}></button>

            <div id="edit-user" uk-modal="true">
                {editableUser &&
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>

                        <div className="uk-modal-header uk-flex">
                            <img className="uk-border-circle uk-margin-right " width="80" height="80" src={editableUser.profile_picture ? editableUser.profile_picture : "/images/cleanvel-logo-letter.png"} alt={editableUser.name} />
                            <h2 className="uk-modal-title title">{editableUser.name} {editableUser.last_name}</h2>
                        </div>

                        <div className="uk-modal-body">
                            <UserForm data={editableUser} errors={errors} register={register} reset={reset}/>
                        </div>

                        <div className="uk-modal-footer uk-text-right">
                            <button className="form-button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditUser;


import React from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, editUser } from "../../redux/UsersDuck";
import EditForm from "../Common/EditForm";
import styled from "styled-components";

const Title = styled.h3`
color: rgb(17, 107, 9);
font-weight: 500;
`

const Img = styled.img`
border: 1px solid rgb(17, 107, 9);
border-radius: 5%;
`


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
            UIkit.modal("#edit-warning").hide();
        })
    };

    return (
        <div>
            <button uk-toggle="target: #edit-warning" href="/usuarios" className="uk-icon-button" uk-icon="file-edit" type="button" onClick={handleClick}></button>

            <div id="edit-warning" uk-modal="true">
                {editableUser &&
                    <div className="uk-modal-dialog uk-modal-body">
                        <Title className="uk-align-center">{editableUser.name} {editableUser.last_name}</Title>
                        <div className="uk-flex">
                            <Img className="uk-align-center uk-margin-right" width="120" height="90" src={editableUser.profile_picture ? editableUser.profile_picture : "/images/cleanvel-logo-letter.png"} alt={editableUser.name} />
                            <EditForm data={editableUser} register={register} errors={errors} reset={reset}/>
                        </div>
                        <hr></hr>
                        <p className="uk-text-right">
                            <button className="button-nb uk-modal-close" type="button">Cancelar</button>
                            <button className="button" type="button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditUser;


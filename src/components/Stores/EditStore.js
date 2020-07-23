import React, { useEffect } from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchStore, editStore } from "../../redux/StoresDuck";
import StoreForm from "../Forms/StoreForm";

const EditStore = ({ id }) => {
    const dispatch = useDispatch();
    const editableStore = useSelector(state => state.stores.editableStore);
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        async function fetchData() {
            const result = await fetch('./api/formValues.json');
            reset(result);
        }
        fetchData();
    }, [reset])

    const handleClick = () => {
        dispatch(searchStore(id));
    };

    const onSubmit = (data) => {
        const id = editableStore._id;
        const params = { id, data }
        dispatch(editStore(params)).then(() => {
            UIkit.modal(`#edit-store-${id}`).hide();
        });
    };


    return (
        <div>
            <button className="uk-icon-button uk-margin-small-right" uk-icon="pencil" type="button" uk-toggle={`target: #edit-store-${id}`} onClick={handleClick}></button>

            <div id={`edit-store-${id}`} uk-modal="true">
                {editableStore &&
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                        <div className="uk-modal-header">
                            <h2 className="uk-modal-title title">{editableStore.name}</h2>
                        </div>
                        <div className="uk-modal-body">
                            <StoreForm data={editableStore} register={register} errors={errors} />
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

export default EditStore;
import React from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct, editProduct } from "../../redux/ProductsDuck";
import ProductForm from "../Forms/ProductForm";

const EditProduct = ({ id }) => {
    const dispatch = useDispatch();
    const editableProduct = useSelector(state => state.products.editableProduct);
    const { register, handleSubmit, errors, reset } = useForm();

    const handleClick = () => {
        dispatch(searchProduct(id));
    };

    const onSubmit = (data) => {
        if (editableProduct.purchase_price !== data.purchase_price) {
            data.purchase_price = (editableProduct.purchase_price + parseFloat(data.purchase_price)) / 2;
        }
        const id = editableProduct._id;
        const quantity = editableProduct.quantity;
        const params = { id, data: { ...data, quantity } }
        dispatch(editProduct(params)).then(() => {
            UIkit.modal(`#edit-product-${id}`).hide();
        });
    };


    return (
        <div>
            <button className="uk-icon-button uk-margin-small-right" uk-icon="file-edit" type="button" uk-toggle={`target: #edit-product-${id}`} onClick={handleClick}></button>

            <div id={`edit-product-${id}`} uk-modal="true">
                {editableProduct &&
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                        <div className="uk-modal-header">
                            <h2 className="uk-modal-title title">{editableProduct.name}</h2>
                        </div>
                        <div className="uk-modal-body">
                            <ProductForm data={editableProduct} register={register} errors={errors} reset={reset} />
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

export default EditProduct;
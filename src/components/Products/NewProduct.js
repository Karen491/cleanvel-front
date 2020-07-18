import React from "react";
import UIkit from "uikit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/ProductsDuck";
import ProductForm from "../Forms/ProductForm";

const NewProduct = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {
        data = { ...data, profit: data.sale_price - data.purchase_price }
        dispatch(createProduct(data)).then(() => {
            UIkit.modal("#new-product").hide();
        });
    };


    return (
        <div className="uk-margin-top uk-margin-medium-right">
            <button uk-toggle="target: #new-user" type="button" className="uk-align-center uk-margin-remove-top app-button">
                <span uk-icon="icon: plus" className="uk-margin-small-right"></span>
                    Agregar nuevo producto
            </button>
{/* 
            <button className="product-button" type="button" uk-toggle="target: #new-product">
                <span className="uk-margin-bottom" uk-icon="icon: plus; ratio: 3"></span>
                <br></br>
                Nuevo producto
            </button> */}

            <div id="new-product" uk-modal="true">
                <div className="uk-modal-dialog">
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title title">Nuevo producto</h2>
                    </div>
                    <div className="uk-modal-body">
                        <ProductForm register={register} errors={errors} reset={reset} />
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="form-button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;
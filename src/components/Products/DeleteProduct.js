import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct, deleteProduct } from "../../redux/ProductsDuck";
import styled from "styled-components";

const Text = styled.p`
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: 16px;
color: rgb(80, 80, 80);
`

const DeleteProduct = ({ id }) => {
    const dispatch = useDispatch();
    const editableProduct = useSelector(state => state.products.editableProduct);

    const handleClick = () => {
        dispatch(searchProduct(id));
    };

    const handleDelete = (id) => {
        id = editableProduct._id;
        dispatch(deleteProduct(id));
    }

    return (
        <div>
            <button className="uk-icon-button" type="button" uk-toggle="target: #delete-product" uk-icon="trash" onClick={handleClick}></button>

            <div id="delete-product" uk-modal="true">
                {editableProduct &&
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>

                        <div className="uk-modal-header">
                            <h2 className="uk-modal-title title">{editableProduct.name}</h2>
                        </div>

                        <div className="uk-modal-body uk-flex">
                            <div className="uk-margin-right"><span className="delete-icon" uk-icon="icon: warning; ratio: 3"></span></div>
                            <div><Text>¿Estas seguro que deseas eliminar este producto de la base de datos?</Text></div>
                        </div>

                        <div className="uk-modal-footer uk-text-right">
                            <button className="form-button uk-modal-close" onClick={handleDelete}>Eliminar producto</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default DeleteProduct;
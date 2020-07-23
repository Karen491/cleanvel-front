import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTransfer } from "../../redux/ProductsDuck";
import { createEvent } from "../../redux/EventsDuck";
import { denormalizeData, currencyFormat } from "../../utils/formatters";
import styled from "styled-components";
import "./uniqueStyles.css"

const Input = styled.input`
border: 1px solid #DB9305;

:focus {
    outline-color: green;
  }
`

const TotalSale = ({ data, store }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const [total, setTotal] = useState(0);
    const { register, handleSubmit, watch, getValues } = useForm();

    useEffect(() => {
        const values = getValues();
        const total = denormalizeData(values).reduce((acc, value) => {
            return acc + parseFloat(value.subtotal);
        }, 0)
        setTotal(total);
    });

    const deleteRow = (e) => {
        let button = e.target;
        button.parentElement.parentElement.parentElement.remove();
    };

    const onSubmit = (data) => {
        const list = denormalizeData(data);
        list.map((product) => {
            let { id, transfer } = product;
            let value = transfer.libertad ? transfer.libertad : transfer.ciudad_judicial;
            transfer = transfer.libertad ? { "libertad": transfer.libertad * -1 } : { "ciudad_judicial": transfer.ciudad_judicial * -1 };
            const eventData = { product: id, user: user._id, action: "sale", value };
            const params = { id, data: { transfer } };
            dispatch(addTransfer(params));
            dispatch(createEvent(eventData)).then(() => {
                document.location.reload(true);
            })
            return params;
        })
    };

    return (
        <div className="uk-card uk-width-1-1@m sales-card">
            <div className="uk-card-header uk-text-center">
                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                    <div className="uk-width-expand">
                        <h3 className="uk-card-title uk-margin-remove-bottom sales-title">Compra Total</h3>
                    </div>
                </div>
            </div>

            <div className="uk-card-body uk-padding-remove uk-height-medium">
                <div className="uk-overflow-auto uk-height-medium">
                    <table className="uk-table uk-table-divider" id="sales-table">
                        <thead>
                            <tr>
                                <td className="sales-head">Producto</td>
                                <td className="sales-head uk-text-center">Precio</td>
                                <td className="sales-head uk-text-center">Cantidad</td>
                                <td className="sales-head uk-text-center">Subtotal</td>
                                <td className="sales-head uk-text-center"></td>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((product, index) => (
                                <tr key={index}>
                                    <td className="sales-cell">{product.name}</td>
                                    <td className="sales-cell uk-text-center">{product.sale_price}</td>
                                    <td className="uk-flex">
                                        <div>
                                            <Input
                                                className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                type="hidden"
                                                name={`${index}.id`}
                                                value={product._id}
                                                ref={register}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                defaultValue={0}
                                                type="number"
                                                name={`${index}.transfer.${store}`}
                                                ref={register}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Input
                                            className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                            type="number"
                                            name={`${index}.subtotal`}
                                            ref={register}
                                            value={(watch(`${index}.transfer.${store}`, 0) * product.sale_price)}
                                            readOnly={true}
                                        />
                                    </td>
                                    <td className="uk-padding-remove">
                                        <button className="nav-text uk-margin-small-top" uk-icon="icon: trash; ratio: 1.2" onClick={deleteRow}></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="uk-card-footer uk-flex uk-flex-between uk-padding-remove-bottom">
                <div>
                    <button className="sales-button" onClick={handleSubmit(onSubmit)}>Guardar</button>
                </div>
                <div>
                    <h3 className="sales-title">Total: <span className="sales-total">{currencyFormat(total)}</span></h3>
                </div>
            </div>
        </div>
    )
}

export default TotalSale;
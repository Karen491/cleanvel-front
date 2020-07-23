import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
border: 1px solid #DB9305;

:focus {
    outline-color: green;
  }
`

const TotalSale = ({ data }) => {
    console.log("Data received", data)
    const [total, setTotal] = useState(0);
    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = (data) => {
        console.log("Data", data);
        setTotal()
    }

    return (
        <div className="uk-card uk-width-1-1@m">
            <div className="uk-card-header uk-text-center">
                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                    <div className="uk-width-expand">
                        <h3 className="uk-card-title uk-margin-remove-bottom">Compra Total</h3>
                    </div>
                </div>
            </div>

            <div className="uk-card-body uk-padding-remove uk-height-medium">
                <table className="uk-table uk-table-divider">
                    <thead>
                        <tr>
                            <td className="table-head">Producto</td>
                            <td className="table-head">Precio Unitario</td>
                            <td className="table-head">Cantidad</td>
                            <td className="table-head">Subtotal</td>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.sale_price}</td>
                                <td>
                                    <Input
                                        className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                        defaultValue={0}
                                        type="number"
                                        name={`${index}.quantity`}
                                        ref={register}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                        type="number"
                                        name={`${index}.subtotal`}
                                        ref={register}
                                        value={(watch(`${index}.quantity`, 0) * product.sale_price)}
                                        readOnly={true}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="uk-card-footer">
                <button onClick={handleSubmit(onSubmit)}>Total</button>
            </div>
        </div>
    )
}

export default TotalSale;
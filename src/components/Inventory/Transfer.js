import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addTransfer } from "../../redux/ProductsDuck";
import { denormalizeData, sortData } from "../../utils/formatters";
import RouteTitle from "../Common/RouteTitle";
import TransferForm from "../Forms/TransferForm";
import styled from "styled-components";

const Boder = styled.td`
border-right: 1px solid white;
`

const Input = styled.input`
border: 1px solid #DB9305;

:focus {
    outline-color: green;
  }
`

const Transfer = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState();
    const [transfer, setTransfer] = useState();
    let products = useSelector(state => state.products.products);
    products = sortData(denormalizeData(products));

    const { register, handleSubmit, errors, watch } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2 } = useForm();

    const onSubmit = (data) => {
        const list = products.filter((product) => {
            return data.origin === "warehouse" ?
                product.availability === data.destination || product.availability === "all" : product.availability === "all"
        })
        setList(list);
        setTransfer(data)
    }

    const submitTransfer = (data) => {
        const { destination } = transfer;
        const list = denormalizeData(data).filter((item) => {
            if (destination === "libertad") {
                return item.transfer.libertad > 0
            } else if (destination === "ciudad_judicial") {
                return item.transfer.ciudad_judicial > 0
            }
            return list;
        });
        list.map((product) => {
            const id = product.id;
            const data = product;
            const params = { id, data };
            dispatch(addTransfer(params)).then(() => {
                document.location.reload(true);
            })
            return params;
        })
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-flex uk-flex-between uk-margin-large-left uk-padding-remove-bottom">
                <RouteTitle title="Inventario CleanVel: Registrar traspaso" img="https://res.cloudinary.com/karen491/image/upload/c_scale,h_351,w_424/v1595050577/cleanvel/App%20pictures/inventory_tivarg.png" />

                <div className="uk-margin-medium-top uk-margin-right">
                    <Link to="/inventario" className="nav-user-icon">
                        <span className="nav-user-icon" uk-icon="icon: chevron-left"></span>
                        Regresar
                    </Link>
                </div>
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            {/* Necessary data for product transfer */}
            <div className="uk-margin-large-left uk-margin-right uk-flex" uk-grid="true">
                <div className="uk-width-3-4">
                    <TransferForm register={register} errors={errors} watch={watch} handleSubmit={handleSubmit(onSubmit)} />
                </div>
            </div>

            {list && transfer &&
                <div className="uk-flex">
                    <div className="uk-overflow-auto uk-height-large uk-margin-large-right uk-margin-large-left uk-margin-small-top uk-width-3-4">
                        <table className="uk-table uk-table-striped">
                            <thead>
                                <tr>
                                    <Boder className="table-head uk-text-center">Producto</Boder>
                                    <td className="table-head"></td>
                                    <Boder className="table-head">{transfer.origin === "warehouse" ? "Almacén" : "Ciudad Judicial"}</Boder>
                                    <Boder className="table-head uk-text-center"><img src="https://res.cloudinary.com/karen491/image/upload/c_scale,h_20,w_50/v1595237318/cleanvel/App%20pictures/arrow_2_xhmipr.png" alt="arrow" /></Boder>
                                    <td className="table-head"></td>
                                    <td className="table-head">{transfer.destination === "ciudad_judicial" ? "Ciudad Judicial" : transfer.destination}</td>
                                </tr>

                                <tr>
                                    <td className="table-head-sub">Nombre</td>
                                    <td className="table-head-sub">Existencias</td>
                                    <td className="table-head-sub">Margen mínimo</td>
                                    <td className="table-head-sub">Enviar</td>
                                    <td className="table-head-sub">Existencias</td>
                                    <td className="table-head-sub">Margen mínimo</td>
                                </tr>
                            </thead>

                            <tbody>
                                {list.map((product, index) => (
                                    <tr key={index}>
                                        <td className="table-cell">{product.name}</td>
                                        <td className="table-cell uk-text-center">
                                            {transfer.origin === "warehouse" ? product.quantity.warehouse : product.quantity.ciudad_judicial}
                                        </td>
                                        <td className="table-cell uk-text-center">{product.minumum}</td>
                                        <td className="uk-flex">
                                            <div>
                                                <input
                                                    className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                    type="hidden"
                                                    name={`${index}.id`}
                                                    ref={register2}
                                                    value={product._id}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    className="table-cell uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                    defaultValue={0}
                                                    type="number"
                                                    name={`${index}.transfer.${transfer.destination}`}
                                                    ref={register2}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="uk-text-right uk-width-1-2 uk-margin-remove-bottom uk-align-center"
                                                    type="hidden"
                                                    name={`${index}.transfer.${transfer.origin}`}
                                                    ref={register2}
                                                    value={watch2(`${index}.transfer.${transfer.destination}`, 0) * -1}
                                                />
                                            </div>
                                        </td>
                                        <td className="table-cell uk-text-center">
                                            {transfer.destination === "ciudad_judicial" ? product.quantity.ciudad_judicial : product.quantity.libertad}
                                        </td>
                                        <td className="table-cell uk-text-center">{product.minumum}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="uk-margin-top uk-text-center">
                        <button className="app-button" onClick={handleSubmit2(submitTransfer)}> + Guardar traspaso</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Transfer;
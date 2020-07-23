import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { denormalizeData, sortData } from "../../utils/formatters";
import RouteTitle from "../Common/RouteTitle";
import SaleForm from "../Forms/SaleForm";
import TotalSale from "./TotalSale";

const Sales = () => {
    let products = useSelector(state => state.products.products);
    products = sortData(denormalizeData(products));
    let [list, setList] = useState();
    let [searchValue, setSearchValue] = useState();
    let [selectedProducts, setSelectedProducts] = useState([]);

    list = !searchValue ? list : list.filter(product => product.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));

    const { register, handleSubmit, errors, watch } = useForm();
    const store = watch("store");

    const onSubmit = () => {
        const list = products.filter((product) => {
            return product.availability === store || product.availability === "all";
        })
        setList(list);
    };

    const handleChange = (e) => {
        let { value } = e.target;
        setSearchValue(value);
    }

    const handleClick = (e) => {
        const id = e.target.id;
        const item = products.filter(product => product._id === id)
        const { _id, name, quantity, sale_price } = item[0];
        const product = { _id, name, sale_price, quantity: store === "libertad" ? quantity.libertad : quantity.ciudad_judicial }
        setSelectedProducts(prevState => [...prevState, product]);
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <div className="uk-margin-large-left uk-padding-remove-bottom">
                <RouteTitle title="Ventas Cleanvel" img="https://res.cloudinary.com/karen491/image/upload/c_scale,h_300,w_424/v1595303386/cleanvel/App%20pictures/sales_xnsbwu.png" />
            </div>
            <hr className="uk-margin-remove-top divider"></hr>

            <div className="uk-flex uk-flex-around uk-width-1-1 uk-margin-small-left">
                <div className="uk-width-2-5">
                    <div className="uk-width-expand">
                        <SaleForm register={register} errors={errors} watch={watch} handleSubmit={handleSubmit(onSubmit)} />
                    </div>

                    {list &&

                        <div className="uk-inline uk-margin-top uk-margin-left uk-width-1-2">
                            <span className="uk-form-icon" uk-icon="icon: search"></span>
                            <input className="uk-input" type="text" placeholder="Buscar producto..." onChange={handleChange} />
                        </div>

                    }

                    {list &&
                        <div className="uk-overflow-auto uk-height-large uk-margin-small-top uk-width-1-1">
                            <table className="uk-table uk-table-striped">
                                <thead>
                                    <tr>
                                        <td className="table-head">Nombre</td>
                                        <td className="table-head">Existencias</td>
                                        <td className="table-head">Seleccionar</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="table-cell">{product.name}</td>
                                            <td className="table-cell uk-text-center">{store === "libertad" ? product.quantity.libertad : product.quantity.ciudad_judicial}</td>
                                            <td className="uk-text-center">
                                                <input className="uk-icon-button" type="button" id={product._id} value="+" onClick={handleClick} />
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>


                <div className="uk-width-2-5">
                    <TotalSale data={selectedProducts} />
                </div>

            </div>

        </div>
    )
};

export default Sales;
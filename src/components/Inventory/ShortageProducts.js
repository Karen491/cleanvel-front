import React from "react";
import { useSelector } from "react-redux";
import { denormalizeData } from "../../utils/formatters";

const ShortageProducts = () => {
    const products = useSelector(state => state.products.products);
    const shortageList = denormalizeData(products).filter((product) => {
        return product.totals.total_quantity < product.minumum;
    })

    return (
        <div>
            <table className="uk-table uk-table-striped">
                <thead>
                    <tr>
                        <td className="table-head">Nombre</td>
                        <td className="table-head uk-text-center">Margen mínimo</td>
                        <td className="table-head uk-text-center">Existencias</td>
                    </tr>
                </thead>

                <tbody>
                    {shortageList.map((product, index) => (
                        <tr key={index}>
                            <td className="table-cell">{product.name}</td>
                            <td className="table-cell uk-text-center">{product.minumum}</td>
                            <td className="table-cell uk-text-center">{product.totals.total_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ShortageProducts;
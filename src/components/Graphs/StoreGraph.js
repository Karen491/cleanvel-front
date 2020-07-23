import React from "react";
import { useSelector } from "react-redux";
import { denormalizeData } from "../../utils/formatters";
import { Doughnut } from "react-chartjs-2";


//This graph shows inventory value per store including the warehouse
const StoreGraph = () => {
    const products = useSelector(state => state.products.products);

    const warehouse = denormalizeData(products).reduce((acc, product) => {
        return acc + product.inventory_value.warehouse;
    }, 0)

    const libertad = denormalizeData(products).reduce((acc, product) => {
        return acc + product.inventory_value.libertad;
    }, 0)

    const ciudad_judicial = denormalizeData(products).reduce((acc, product) => {
        return acc + product.inventory_value.ciudad_judicial;
    }, 0)

    const graphData = {
        labels: ["Almacén", "Libertad", "Ciudad Judicial"],
        datasets: [
            {
                label: "Valor en inventario",
                data: [warehouse.toFixed(2), libertad.toFixed(2), ciudad_judicial.toFixed(2)],
                backgroundColor: ["#25424dd0", "#2B7A78", "#3AAFA9"],
            }
        ]
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <Doughnut data={graphData} />
        </div>
    )
}

export default StoreGraph;
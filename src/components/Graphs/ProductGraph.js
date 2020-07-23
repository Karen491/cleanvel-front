import React from "react";
import { useSelector } from "react-redux";
import { denormalizeData } from "../../utils/formatters";
import { HorizontalBar } from "react-chartjs-2";


//This graph shows the 10 products with the highest inventory value
const ProductGraph = () => {
    const products = useSelector(state => state.products.products);
    const productFilter = denormalizeData(products).sort((a, b) => {
        return b.totals.inventory_value - a.totals.inventory_value;
    });

    const names = productFilter.slice(0, 10).map((prodcut) => {
        return prodcut.name;
    });
    const values = productFilter.slice(0, 10).map((prodcut) => {
        return prodcut.totals.inventory_value;
    });
    const color = values.map((product, index) => {
        return index % 2 ? "#3AAFA9" : "#25424dd0";
    });

    const graphData = {
        labels: names,
        datasets: [
            {
                label: "Valor en inventario",
                data: values,
                backgroundColor: color,
            }
        ]
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <HorizontalBar data={graphData} />
        </div>
    )
}

export default ProductGraph;
import React from "react";
import { useSelector } from "react-redux";
import { denormalizeData } from "../../utils/formatters";
import { Pie } from "react-chartjs-2";

//This graph shows inventory value per category (4 main categories)
const CategoryGraph = () => {
    const products = useSelector(state => state.products.products);
    const productFilter = denormalizeData(products).sort((a, b) => {
        return b.totals.inventory_value - a.totals.inventory_value;
    });

    const chemicalValue = productFilter.reduce((acc, product) => {
       return product.category === "Químico" ? acc + product.totals.inventory_value : acc;
    }, 0)

    const disposableValue = productFilter.reduce((acc, product) => {
        return product.category === "Desechables" ? acc + product.totals.inventory_value : acc;
     }, 0)

     const suppliesValue = productFilter.reduce((acc, product) => {
        return product.category === "Jarciería" ? acc + product.totals.inventory_value : acc;
     }, 0)

     const paperValue = productFilter.reduce((acc, product) => {
        return product.category === "Papel" ? acc + product.totals.inventory_value : acc;
     }, 0)

    const graphData = {
        labels: ["Químicos", "Desechables", "Jarciería", "Papel"],
        datasets: [
            {
                label: "Valor por Categoría",
                data: [chemicalValue, disposableValue, suppliesValue, paperValue],
                backgroundColor: ["#25424dd0", "#2B7A78", "#DEF2F1", "#3AAFA9"]
            }
        ]
    }

    return (
        <div className="uk-margin-left uk-width-expand">
            <Pie data={graphData} />
        </div>
    )
}

export default CategoryGraph;
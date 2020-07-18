import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/ProductsDuck";
import { denormalizeData } from "../../utils/formatters";
import styled from 'styled-components'
import InventoryTable from "./InventoryTable";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    background-color: white;

    tr {
      :last-child {
        td {border-bottom: 0;}
      }
    }

    th, td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`

const Inventory = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const columns = React.useMemo(() => [
        {
            Header: 'Datos del producto',
            columns: [
                {
                    Header: 'Nombre',
                    accessor: 'name',
                },
                {
                    Header: 'Disponibilidad',
                    accessor: 'availability',
                },
                {
                    Header: 'Margen mínimo',
                    accessor: 'minumum',
                },
                {
                    Header: 'Precio de compra',
                    accessor: 'purchase_price',
                },
                {
                    Header: 'Precio de venta',
                    accessor: 'sale_price',
                },
                {
                    Header: 'Margen de ganancia',
                    accessor: 'profit',
                },
            ]
        },
        {
            Header: 'Cantidad',
            columns: [
                {
                    Header: 'Almacen',
                    accessor: 'quantity.warehouse',
                },
                {
                    Header: 'Libertad',
                    accessor: 'quantity.libertad',
                },
                {
                    Header: 'Ciudad Judicial',
                    accessor: 'quantity.ciudad_judicial',
                },
            ]

        },
        {
            Header: 'TOTALES', 
            columns: [
                {
                    Header: 'Cantidad total',
                    accessor: 'totals.total_quantity',
                },
                {
                    Header: 'Valor de inventario',
                    accessor: 'totals.inventory_value',
                },
            ]
        }

    ], []);

    return (
        <div>
            <h1>Inventario</h1>
            <Styles>
                <InventoryTable columns={columns} data={denormalizeData(products)} />
            </Styles>
        </div>
    )
}

export default Inventory;
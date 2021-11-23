import React, { useState, useEffect } from 'react'
import Axios from "axios";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { toast } from 'react-toastify';

export default function OrderList(props) {

    const { setOrderId, setOrderListVisibility } = props;

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
                setOrderList(res.data)
            })
            .catch(err => toast.error("Error al actualizar orden"))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }


    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Numero de Orden</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Pagado con:</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.id}>
                                <TableCell
                                    >
                                    {item.id}
                                </TableCell>
                                <TableCell
                                   >
                                    {item.customer}
                                </TableCell>
                                <TableCell
                                  >
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    >
                                    {item.total}
                                </TableCell>
                                <TableCell
                                >
                                    {item.status}
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

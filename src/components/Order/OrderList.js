import React, { useState, useEffect } from 'react'
import Axios from "axios";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/orderlist").then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {
        if (window.confirm('Estas seguro que quieres eliminar este record?')) {
            Axios.delete(`https://caribeazul-backend-4w2sk.ondigitalocean.app/deleteorder/${id}`).then(res => {
                    setOrderListVisibility(false);
                    setOrderId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Deleted successfully.' });
                })
                .catch(err => console.log(err))
        }
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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.id}>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.id}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.customer}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.total}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                        onClick={e => deleteOrder(item.id)} />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

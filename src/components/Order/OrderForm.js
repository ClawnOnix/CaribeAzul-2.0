import React, { useState, useEffect } from 'react'
import Form from "../../layouts/Form";
import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import { Input, Select, Button } from "../../Controls";
import ReplayIcon from '@material-ui/icons/Replay';
import ReorderIcon from '@material-ui/icons/Reorder';
import Axios from "axios";
import { roundTo2DecimalPoint, timeNow } from "../../Utils/Utils";
import Popup from '../../layouts/Popup';
import OrderList from './OrderList';
import Notification from "../../layouts/Notification";
import { pMethods } from '../../Utils/constants';
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {

    const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls } = props;
    const classes = useStyles();
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({ isOpen: false })


    useEffect(() => {

        let gTotal = values.orderDetails.reduce((tempTotal, product) => {
            return tempTotal + (product.quantity * product.sellPrice);
        }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })


    }, [JSON.stringify(values.orderDetails)]);

    useEffect(() => {
        if (orderId === 0) resetFormControls()
        else {
            Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
                setValues(res.data);
                setErrors({});
            })
                .catch(err => toast.error("Error al obtener Ordenes!"))
        }

    }, [orderId]);

    const validateForm = () => {
        let temp = {};
        temp.customer = values.customer !== "" ? "" : "Este campo es requerido.";
        temp.pMethod = values.pMethod !== "none" ? "" : "Este campo es requerido.";
        temp.gTotal = values.gTotal !== 0 ? "" : "Elige los productos.";
        temp.orderDetails = values.orderDetails.length !== 0 ? "" : "Este campo es requerido.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const resetForm = () => {
        resetFormControls();
        setOrderId(0);
    }


    const submitOrder = e => {
        e.preventDefault();
        let date = timeNow()
        if (validateForm()) {
            let ITBIS = null;
            let gtotal = null;
            if (values.pMethod === "Tarjeta") {
                ITBIS = Math.floor(values.gTotal * 18) / 100;
                gtotal = values.gTotal + ITBIS;
            }
            if (values.descuento !== null && values.descuento > 0) {
                gtotal = gtotal - values.descuento;
            }
            Axios.post("https://caribeazul-backend-muvy3.ondigitalocean.app/neworder", {
                customer: values.customer,
                pMethod: values.pMethod,
                total: gtotal,
                date: date,
                status: "Normal",
                products: JSON.stringify(values.orderDetails),
                ITBIS: ITBIS,
                descuento: values.descuento
            }).then(res => {
                updateProductQuantity(values.orderDetails)
                resetFormControls();
                setNotify({ isOpen: true, message: 'Se ha creado la nueva orden' });
            }).catch(err => toast.error("Error al Crear orden"));

        }

    }

    function updateProductQuantity([details]) {
        let getProducts = []
        console.log("aqui llega")
        Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/productlist").then((response) => {
            getProducts = response.data;
        });
        console.log("aqui ya no")
        details.map((item) => {
            return getProducts.map( (items) => {
                console.log(item.id)
                console.log(items.id)
                 if (item.id === items.id) {
                    const resta = items.quantity - item.quantity;

                    console.log("aqui llegue")
                    if (resta > 0) {
                        console.log("aqui x2")
                         Axios.put(`https://caribeazul-backend-muvy3.ondigitalocean.app/updateproduct`, {
                            id: item.id,
                            quantity: resta,

                        }).then((res) => {
                             console.log(res)
                        });
                    }
                    if (resta > 0) {
                        Axios.put(`https://caribeazul-backend-muvy3.ondigitalocean.app/updateproduct`, {
                            id: item.id,
                            quantity: resta,

                        }).then((res) => {
                             console.log(res)
                        });
                    }
                 
                }
            })
        })
    }

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container>
                    <Grid item xs={6} style={{ heigth: "150px" }}>
                        <Input
                            style={{ width: "500px" }}
                            disabled
                            label="Numero de Orden"
                            name="orderNumber"
                            value={values.id}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.adornmentText}
                                    position="start">#</InputAdornment>
                            }}
                            iLProps={{ style: { marginTop: "5px" } }}
                        />
                        <Input
                            label="Cliente"
                            placeholder="Cliente"
                            value={values.customer}
                            name="customer"
                            onChange={handleInputChange}
                            style={{ width: "500px" }}
                            iLProps={{ style: { marginTop: "5px" } }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            label="Metodo de Pago"
                            name="pMethod"
                            value={values.pMethod}
                            onChange={handleInputChange}
                            options={pMethods}
                            error={errors.pMethod}
                        />
                        <Input
                            type="number"
                            label="Descuento"
                            name="descuento"
                            value={values.descuento}
                            onChange={handleInputChange}
                            style={{ width: "500px" }}
                            iLProps={{ style: { marginTop: "5px" } }}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.adornmentText}
                                    position="start">$</InputAdornment>
                            }}
                        />
                        <Input
                            disabled
                            label="Total"
                            name="gTotal"
                            value={values.gTotal}
                            style={{ width: "500px" }}
                            iLProps={{ style: { marginTop: "5px" } }}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    className={classes.adornmentText}
                                    position="start">$</InputAdornment>
                            }}
                        />
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                style={{ width: "250px" }}
                                size="large"
                                type="submit">Procesar</MuiButton>
                            <MuiButton
                                style={{ width: "250px" }}
                                size="small"
                                onClick={resetForm}
                                startIcon={<ReplayIcon />}
                            />
                        </ButtonGroup>
                        <Button
                            style={{ width: "250px", marginLeft: "140px" }}
                            size="medium"
                            onClick={openListOfOrders}
                            startIcon={<ReorderIcon />}
                        >Ordenes</Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup
                title="Lista de Ordenes"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList
                    {...{ setOrderId, setOrderListVisibility }} />
            </Popup>
            <Notification
                {...{ notify, setNotify }} />
        </>
    )
}

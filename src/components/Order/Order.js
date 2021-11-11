import React, {useEffect, useState} from 'react'
import OrderForm from './OrderForm'
import { useForm } from '../../Hooks/UseForm';
import { Grid } from '@material-ui/core';
import SearchItems from './SearchItems';
import Orderedtems from './OrderedItems';
import Axios from "axios"

export default function Order() {
    const [order, setOrder] = useState(1)

    useEffect(() => {
        Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/orderlist").then(res => {
            if(res.data.id > 1){
                setOrder(res.data)
            }
            })
            .catch(err => console.log(err))
    }, []);

    const getFreshModelObject = () => ({
        orderMasterId: 0,
        orderNumber: order.id,
        customerId: 0,
        pMethod: 'none',
        gTotal: 0,
        deletedOrderItemIds: '',
        orderDetails: []
    })
    
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
                        resetFormControls
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <SearchItems
                    {...{
                        values,
                        setValues
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <Orderedtems
                    {...{
                        values,
                        setValues
                    }}
                />
            </Grid>
        </Grid>
    )
}

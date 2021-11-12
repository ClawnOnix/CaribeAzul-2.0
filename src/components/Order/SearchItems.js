import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function SearchItems(props) {

    const { values, setValues } = props;
    let orderedItems = values.orderDetails;

    const [Items, setItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/productlist").then(res => {
                setItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        let x = [...Items];
        x = x.filter(y => {
            return y.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && orderedItems.every(item => item.id !== y.id)
        });
        setSearchList(x);
    }, [searchKey, orderedItems])

    const addItem = Item => {
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetailId: 0,
            id: Item.id,
            quantity: 1,
            price: Item.price,
            name: Item.name
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
            <Paper className={classes.searchPaper} style={{width: "500px", marginLeft:"10px"}}>
                <InputBase
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Buscar Artiulos" />
                <IconButton style={{width: "100px"}}>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot} style={{width: "500px", marginLeft:"10px"}}>
                {
                    searchList.map((item, idx) => (
                        <ListItem
                            key={idx}
                            onClick={e => addItem(item)}>
                            <ListItemText
                                primary={item.name}
                                secondary={'$' + item.price} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e => addItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

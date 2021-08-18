import axios from 'axios';
import config from '../../core/config';
import {toastr} from 'react-redux-toastr';
import React from 'react';

export function orderForm(object) {
    return {
        type: 'ORDER_FORM',
        orderForm: object
    }
}

export function fetchOrderForm() {
    return (dispatch) => {
        vtexjs.checkout.getOrderForm()
            .done(function(object) {
                dispatch(orderForm(object));
            });
    }
}

export function fetchFirstSku(id) {
    return (dispatch) => {
        axios.get(config.host + '/api/catalog_system/pub/products/variations/' + id)
            .then( response => {

                let data = response.data.skus;
                let flag = true;

                data.filter(item => {

                    if(flag && item.available) {
                        flag = false;
                        return true;
                    } else return false;

                });

                if(data.length) dispatch(firstSku(data[0].sku));

            });
    }
}

export function firstSku(idFirstSku) {
    return {
        type: 'FIRST_ID_SKU',
        idFirstSku: idFirstSku
    }
}

export function addToCart(items) {
    return async () => {
        let orderForm = await vtexjs.checkout.getOrderForm();
        const itemsUpdate = items.filter((item) => orderForm.items.filter((i) => i.id == item.id).length > 0).map((item) => {
            const index     = orderForm.items.findIndex((i) => item.id == i.id);
            const quantity  = item.quantity + orderForm.items[index].quantity;
            return {index, quantity};
        });
        
        items = items.filter((item) => orderForm.items.filter((i) => i.id == item.id).length == 0);

        // Insert 
        if(items.length) {
            orderForm = await vtexjs.checkout.addToCart(items, null, config.seller.channel);
            orderForm.items.forEach((item) => {
                const ids = items.map((item) => item.id);
                if(ids.indexOf(item.id) !== -1) { 
                    toastr.success('Produto Adicionado', item.name, {
                        icon: (<img src={item.imageUrl} />)
                    });    
                }
            });
        }

        // Update
        if(itemsUpdate.length) {
            orderForm = await vtexjs.checkout.updateItems(itemsUpdate, null, false);
            orderForm.items.forEach((item, index) => {
                const indexs = itemsUpdate.map((i) => i.index);
                if(indexs.indexOf(index) !== -1) { 
                    toastr.warning('Produto Atualizado', item.name, {
                        icon: (<img src={item.imageUrl} />)
                    });    
                }
            });
        }
        if(msgIndex < orderForm.messages.length)
            console.log(orderForm)
            msg(orderForm.messages);
        return orderForm;
    }
}

let msgIndex = 0;

export function msg(messages) {
    for(let i=msgIndex; i < messages.length; i++) {
        if("O valor do frete foi alterado" !== messages[i].text)
            toastr.warning('Ops! Ocorreu algum problema.', messages[i].text, {
                timeOut: 0,
                extendedTimeOut: 0
            });
    }
    msgIndex = messages.length;
}
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

import './style.styl';

const store = configureStore();

import Painel from './painel';
import Heart from './heart';

export function load(orderForm) {
    console.log('[ WISHLIST ] Loading...',orderForm);

    let rootPainel = document.querySelector('[data-component=wishlist]');
    if(rootPainel) {
        ReactDOM.render(
            <Provider store={ store }>
                <Painel orderForm={ orderForm } id={ orderForm.clientProfileData.email } />
            </Provider>,
            rootPainel
        );
    }

}

export function loadHeart() {
    let rootHearts = Array.from(document.querySelectorAll('[data-component=wishlist-add]:not(actived)'));
    if(rootHearts.length) {
        rootHearts.forEach(rootHeart => {
            const id = rootHeart.getAttribute('data-id');
            rootHeart.classList.add('actived');
            ReactDOM.render(
                <Provider store={ store }>
                    <Heart id={ id } />
                </Provider>,
                rootHeart
            )
        });
    }
}

$vtex(document).ajaxComplete(function(){
    loadHeart();
});

export default () => {
    if(typeof vtexjs == 'object') {
        vtexjs.checkout.getOrderForm()
            .done(function(orderForm) {
                if(orderForm.loggedIn)
                    load(orderForm);
            });
    }
    loadHeart();
}
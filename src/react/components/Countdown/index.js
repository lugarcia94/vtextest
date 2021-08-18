import React from 'react';
import ReactDOM from 'react-dom';
import CountDown from './CountDown';
import getProductById from "Core/getProductById";
import moment from 'moment';
// buscapagina
export default async () => {
    const countDown = Array.from(document.querySelectorAll('.showcase__item:not(.showcase__item--countdown) .product_field_27 .sim'));

    countDown.forEach((root) => {
        const id = root.closest('[data-sku]').getAttribute('produto');
        const elRoot = root.closest('.showcase__item');

        if (id && root) {
            renderCountDown(id, elRoot);
        }
    });

    const pageProductCountdown = document.querySelector('[data-component=countdown]');
    if (pageProductCountdown) {
        const product = await vtexjs.catalog.getCurrentProductWithVariations();
        const id = product.productId;
        const prod = await getProductById(id);

        if (prod.countdown) {
            if (prod.countdown.filter((item) => item === 'Sim')) {
                renderCountDown(id, pageProductCountdown);
            }
        }
    }
}

async function renderCountDown(id, root) {
    try {
        const data = await getProductById(id);
        if (data) {
            const item = data.items[0];
            const seller = item.sellers[0];
            const Price = seller.commertialOffer.ListPrice;
            const PriceWithoutDiscount = seller.commertialOffer.Price;
            const dateValid = new Date(seller.commertialOffer.PriceValidUntil);
            const div = document.createElement('div');

            root.appendChild(div);
            root.setAttribute('data-countdown', 'true');

            if (PriceWithoutDiscount && dateValid && moment(dateValid).isAfter(new Date()) && Price !== PriceWithoutDiscount) {

                ReactDOM.render(
                    <CountDown valid={dateValid} />,
                    div
                );
            }
        }
    } catch (e) {
        console.log('[COUNTDOWN]: Error', e);
    }
}
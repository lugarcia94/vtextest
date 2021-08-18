export function firstSku(state = 0, action) {
    switch (action.type) {
        case 'FIRST_ID_SKU':
            return action.idFirstSku;

        default:
            return state;
    }
}

export function orderForm(state = {}, action) {
    switch (action.type) {
        case 'ORDER_FORM':
            return action.orderForm;

        default:
            return state;
    }
}

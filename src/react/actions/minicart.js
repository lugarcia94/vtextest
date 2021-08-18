const body = document.querySelector('body');

export function minicartHasErrored(bool) {
    return {
        type: 'MINICART_HAS_ERRORED',
        hasErrored: bool
    }
}

export function minicartIsLoading(bool) {
    return {
        type: 'MINICART_IS_LOADING',
        isLoading: bool
    }
}


export function minicartExpanded(bool) {
    return {
        type: 'MINICART_EXPANDED',
        expanded: bool
    }
}

export function minicartQtd(number) {
    return {
        type: 'MINICART_QTD',
        amount: number
    }
}

export function minicartItems(item) {
    return {
        type: 'MINICART_ITEMS',
        item
    }
}


export function minicartClean() {
    return {
        type: 'MINICART_CLEAN',
        item: []
    }
}

export function minicartFetchDataSuccess(minicart) {
    return {
        type: 'MINICART_FETCH_DATA_SUCCESS',
        minicart
    }
}

export function minicartFetchData(callback = function(){}) {
    return (dispatch) => {
        dispatch(minicartIsLoading(true));

        vtexjs.checkout.getOrderForm()
            .done((minicart) => {
                dispatch(minicartIsLoading(false));
                dispatch(minicartFetchDataSuccess(minicart));

                let amount = 0;
                minicart.items.forEach((item)=>{
                    amount += parseInt(item.quantity);
                });
                
                dispatch(minicartClean());
                minicart.items.forEach((item) => dispatch(minicartItems(item)));
                dispatch(minicartQtd(amount));

                Array.from(document.querySelectorAll('[data-cart=amount]')).forEach(item => item.innerHTML = amount);

                callback();

            })
            .fail(() => dispatch(minicartHasErrored(true)));
    }
}


export function minicartIsRemove(bool) {
    return {
        type: 'MINICART_IS_REMOVE',
        isRemoved: bool
    }
}

export function minicartRemove(index) {
    return {
        type: 'MINICART_REMOVE',
        index
    }
}

export function minicartFetchDataRemove(index) {
    return(dispatch) => {
        dispatch(minicartIsRemove(true));

        vtexjs.checkout.getOrderForm()
            .then((orderForm) => {
                let item = orderForm.items[index];
                let itemToRemove = [
                    {
                        "index": index,
                        "quantity": item.quantity,
                    }
                ];

                return vtexjs.checkout.removeItems(itemToRemove);
            }).done(() => {
                dispatch(minicartFetchData(() => dispatch(minicartIsRemove(false))));
            });
    }
}

export function minicartToggle(bool) {

    if(bool)    body.classList.add('minicart--fixed');
    else        body.classList.remove('minicart--fixed');

    return (dispatch) => dispatch(minicartExpanded(bool));
}
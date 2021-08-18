export function minicartHasErrored(state = false, action) {
    switch (action.type) {
        case 'MINICART_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function minicartIsLoading(state = false, action) {
    switch (action.type) {
        case 'MINICART_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function minicartIsRemove(state = false, action) {
    switch (action.type) {
        case 'MINICART_IS_REMOVE':
            return action.isRemoved;

        default:
            return state;
    }
}

export function minicartQtd(state = 0, action) {
    switch (action.type) {
        case 'MINICART_QTD':
            return action.amount;

        default:
            return state;

    }
}

export function minicart(state = {}, action) {
    switch (action.type) {
        case 'MINICART_FETCH_DATA_SUCCESS':
            return action.minicart;

        default:
            return state;
    }
}

export function minicartItems(state = [], action) {
    switch (action.type) {
        case 'MINICART_ITEMS':
            let items = [
                ...state,
                action.item
            ];

            return items;

        case 'MINICART_CLEAN':
            return action.item;

        default:
            return state
    }
}


export function minicartExpanded(state = false, action) {
    switch (action.type) {
        case 'MINICART_EXPANDED':
            return action.expanded;
        default:
            return state;

    }
}


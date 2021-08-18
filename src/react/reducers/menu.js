export function menuHasErrored(state = false, action) {
    switch (action.type) {
        case 'MENU_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function menuIsLoading(state = false, action) {
    switch (action.type) {
        case 'MENU_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function menuExpanded(state = false, action) {
    switch (action.type) {
        case 'MENU_EXPANDED':
            return action.expanded;

        default:
            return state;

    }
}

export function menu(state = [], action) {
    switch (action.type) {
        case 'MENU_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}
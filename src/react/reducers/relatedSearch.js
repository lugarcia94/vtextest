export function relateds(state = [], action) {
    switch (action.type) {
        case 'RELATED_PRODUCTS':
            return action.relateds;

        default:
            return state;
    }
}

export function paginateRelateds(state = {page: 1, total: 0}, action) {
    switch (action.type) {
        case 'RELATED_PAGINATE':
            return action.paginate;

        default:
            return state;

    }
}

export function loadingRelateds(state = false, action) {
    switch (action.type) {
        case 'RELATED_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function searchRelateds(state = false, action) {
    switch (action.type) {
        case 'RELATED_SEARCH':
            return action.search;

        default:
            return state;
    }
}

export function errorRelateds(state = false, action) {
    switch (action.type) {
        case 'RELATED_ERROR':
            return action.error;

        default:
            return state;
    }
}
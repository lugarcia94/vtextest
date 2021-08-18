const INIT_WISHLIST = { id: 0, products: [] };

export function wishlist(state = INIT_WISHLIST, action) {
    let products = state.products;
    let wishlist = state;
    switch (action.type) {
        case 'WISHLIST':
            return action.products;
        case 'WISHILIST_ADD':
            if(state.products.indexOf(action.id) == -1)
                products = state.products.push(action.id);
            wishlist = {
                id: state.id,
                idCliente: state.idCliente,
                products
            };
            return wishlist;
        case 'WISHILIST_REMOVE':
            products = state.products.filter((id) => id != action.id);
            wishlist = {
                id: state.id,
                idCliente: state.idCliente,
                products
            };
            return wishlist;
        default:
            return state;
    }
}

export function isLoadWishlist(state = true, action) {
    switch (action.type) {
        case 'IS_LOAD_WISHLIST': 
            return action.loadding;
        default:
            return state;
    }
}

const INIT_WISHLIST_PRODUCT = [];
export function products(state = INIT_WISHLIST_PRODUCT, action) {
    switch (action.type) {
        case 'WISHLIST_PRODUCTS':
            return [ ...state, action.products ];
        case 'WISHLIST_DELETE': 
            let products  = state.filter((product) => product.id != action.id);
            return products;
        default :
            return state;
    }
}

export function isRemoving(state=false, action) {
    switch (action.type) {
        case 'WISHLIST_IS_REMOVING':
            return action.removing;
        default:
            return state;
    }
}

export function isCreating(state=false, action) {
    switch (action.type) {
        case 'WISHLIST_IS_CREATING':
            return action.creating;
        default:
            return state;
    }
}

export function wishlistOrderForm(state={loggedIn: false}, action) {
    switch (action.type) {
        case 'WISHLIST_ORDERFORM': 
            return action.orderForm;
        default: 
            return state;
    }
}
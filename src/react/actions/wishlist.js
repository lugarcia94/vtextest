import axios from 'axios';
import config from 'Core/config'; 
const HOST = '/api';

function randomNumber() {
    return Math.floor((Math.random() * 5) + 1) + new Date().getTime();
}

export function wishlist(products) {
    return {
        type: 'WISHLIST',
        products
    }
}

export function wishlistOrderForm(orderForm) {
    return {
        type: 'WISHLIST_ORDERFORM',
        orderForm
    }
}
import load from '../components/WishList';
export function wishlistLogin() {
    return (dispatch) => {
        return vtexjs.checkout.getOrderForm()
            .done((orderForm) => {
                if(!orderForm.loggedIn) {
                    vtexid.start({
                        returnUrl: '',
                        userEmail: '',
                        locale: 'pt-BR',
                        forceReload: false
                    })
                } else {
                    dispatch(wishlistOrderForm(orderForm));
                    load(orderForm);
                }
            });
    }
}

export function wishlistRemove(id) {
    return {
        type: 'WISHILIST_REMOVE',
        id
    }
}

export function wishlistAdd(id) {
    return {
        type: 'WISHILIST_ADD',
        id
    }
}

export function isLoadWishlist(loadding) {
    return {
        type: 'IS_LOAD_WISHLIST',
        loadding
    }
}

export function loadWishlist(_id_) { 
    return (dispatch) => { 
        const request = axios.get(`${ HOST }/dataentities/LD/search/?idCliente=${ _id_ }&_fields=id,idCliente,products&${ randomNumber() }`);
        dispatch(isLoadWishlist(true));
        return request
            .then((data) => { 
                data = data.data; 
                let idCliente = _id_;
                let _products = [];
                let _dataTMP = { idCliente, products: _products };
                if(data.length) {
                    _dataTMP.id         = data[0].id;
                    _dataTMP.products   = JSON.parse(data[0].products);
                    if(_dataTMP.products.length) { 
                        let count = 0;
                        let total = _dataTMP.products.length;
                        _dataTMP.products.forEach((id) => {
                            const request = fetchProduct(id);
                            request
                                .then((data) => data.data)
                                .then((data) => { 
                                    if(data.length) {
                                        let product = maskProduct(data[0]);
                                        dispatch(products(product));
                                    }
                                    
                                    if(++count == total) {
                                        dispatch(isLoadWishlist(false));
                                    }
                                    
                                    return null;
                                })
                                .catch(() => {
                                    dispatch(isLoadWishlist(false));
                                });
                        });
                    } else dispatch(isLoadWishlist(false));
                    
                } else {
                    dispatch(isLoadWishlist(false));
                }
                dispatch(wishlist(_dataTMP));
                return null;
            })
            .catch((err) => dispatch(isLoadWishlist(false)));
    }
}

function fetchProduct(id) {
    return axios.get(`${ HOST }/catalog_system/pub/products/search?fq=productId:${ id }&${ Math.floor((Math.random() * 5) + 1) }`);
}

function maskProduct(data) {
    return {
        id: parseInt(data.productId),
        name: data.productName,
        link: data.link,
        image: {
            url: data.items[0].images[0].imageUrl,
            label: data.items[0].images[0].imageText
        },
        skuID: parseInt(data.items[0].itemId)
    };
}

export function create(id) {
    return (dispatch) => {  
        const request = fetchProduct(id);
        return request
            .then((data) => data.data)
            .then((data) => { 
                if(data.length) {
                    let product = maskProduct(data[0]);
                    dispatch(products(product));
                }
                return null;
            });
    }
}

export function isCreating(creating) {
    return {
        type: 'WISHLIST_IS_CREATING',
        creating
    }
}

export function isRemoving(removing) {
    return {
        type: 'WISHLIST_IS_REMOVING',
        removing
    }
}

export function remove(id) {
    return {
        type: 'WISHLIST_DELETE',
        id
    }
}

export function update(id) {
    return (dispatch, getState) => {
        let wishlist    = getState().wishlist; 
        let index       = wishlist.products.indexOf(id);
        let addFlag     = false;
        let _wishlist   = {
            id: wishlist.id,
            idCliente: wishlist.idCliente,
            products: []
        };

        if(wishlist.id == 0) delete _wishlist.id;
        
        if(index != -1) {
            wishlist.products.splice(index, 1);
            dispatch(isRemoving(true));
            dispatch(remove(id));
        } else  {
            wishlist.products.push(id);
            dispatch(isCreating(true));
            dispatch(create(id));
            addFlag = true;
        }
        
        _wishlist.products = JSON.stringify(wishlist.products);
        return axios.patch(`${ HOST }/dataentities/LD/documents/`, _wishlist)
            .then(() => { 
                if(!_wishlist.id) {
                    vtexjs.checkout.getOrderForm()
                        .done((orderForm) => {
                            _wishlist.id = orderForm.clientProfileData.email;
                            dispatch(wishlist(_wishlist));
                        });
                }
                if(addFlag) {
                    dispatch(isCreating(false));
                    dispatch(wishlistAdd(id));
                } else {        
                    dispatch(isRemoving(false));
                    dispatch(wishlistRemove(id));
                }
                return null;
            }).catch(err=> {
                if(addFlag) {
                    dispatch(isCreating(false));
                    dispatch(remove(id));
                } else {
                    dispatch(isRemoving(false));
                    dispatch(create(id));
                }
            });
    }
}

export function products(products) {
    return {
        type: 'WISHLIST_PRODUCTS',
        products
    }
}

export function buy(products) {
    return ( dispatch ) => {
        let items = [];
        products.forEach((product) => {
            const item = {
                id: product.skuID,
                quantity: product.quantity || 1,
                seller: config.seller.id
            };
            items.push(item);
        });
        return vtexjs.checkout.addToCart(items, null, config.seller.channel)
            .done(function(orderForm) {
                orderForm.items.forEach((item) => {
                    let removeProduct = products.filter(( prod ) => prod.id == parseInt(item.productId));
                    removeProduct.forEach((prod) => dispatch(update(prod.id)));
                });
                return orderForm;
            });
    }
}

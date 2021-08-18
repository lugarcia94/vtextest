import { combineReducers } from 'redux';
import { menu, menuHasErrored, menuIsLoading, menuExpanded } from './menu';
import { minicart, minicartHasErrored, minicartIsLoading, minicartQtd, minicartExpanded, minicartItems, minicartIsRemove } from './minicart';
import { orderForm, firstSku } from './core';
import { giftlist } from "./giftlist";
import { relateds, paginateRelateds, loadingRelateds, searchRelateds, errorRelateds } from "./relatedSearch";
import { wishlist, isLoadWishlist, products, isCreating, isRemoving, wishlistOrderForm } from './wishlist';
import { wholesale } from './wholesale';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    toastr: toastrReducer,
    orderForm,
    firstSku,

    giftlist,

    menu,
    menuHasErrored,
    menuIsLoading,
    menuExpanded,

    minicart,
    minicartHasErrored,
    minicartIsLoading,
    minicartQtd,
    minicartExpanded,
    minicartItems,
    minicartIsRemove,

    relateds,
    paginateRelateds,
    loadingRelateds,
    searchRelateds,
    errorRelateds,

    wishlist,
    isLoadWishlist,
    products,
    isCreating,
    isRemoving,
    wishlistOrderForm,
    wholesale
});
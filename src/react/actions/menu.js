import {slug} from './../../core/functions';
import axios from 'axios';

const body = document.querySelector('body');
const utils = document.querySelector('#ah-utils');

export function menuHasErrored(bool) {
    return {
        type: 'MENU_HAS_ERRORED',
        hasErrored: bool
    }
}

export function menuIsLoading(bool) {
    return {
        type: 'MENU_IS_LOADING',
        isLoading: bool
    }
}

export function menuExpanded(bool) {
    return {
        type: 'MENU_EXPANDED',
        expanded: bool
    }
}

export function menuFetchDataSuccess(items) {
    return {
        type: 'MENU_FETCH_DATA_SUCCESS',
        items
    }
}

export function menuToggle(bool) {

    if(bool) {
        body.classList.add('menutopbar--fixed');
    } else {
        body.classList.remove('menutopbar--fixed');
    }

    return (dispatch) => dispatch(menuExpanded(bool));
}

export function menuFilterData(items) {
    return dispatch => {

        if(utils) {
            const icons = utils.querySelector('#menu-icons');
            const banners = utils.querySelector('#menu-banners');
            const brands = utils.querySelector('#menu-brands');
            
            Array.from(items).forEach((item) => {
                let _name = item.name;
                let _slug = slug(_name);
                let _icon;
                let _banner;
                let _brand;

                if (icons && _slug)
                    _icon = icons.querySelector('.' + _slug);
    
                if (banners && _slug)
                    _banner = banners.querySelector('.' + _slug);
    
                if (brands && _slug)
                    _brand = brands.querySelector('.' + _slug);
    
                item['icon'] = '';
                item['banner'] = '';
                item['brand'] = '';

                if (_icon)      item['icon']    = _icon.innerHTML;
                if (_banner)    item['banner']  = _banner.innerHTML;
                if (_brand)    item['brand']  = _brand.innerHTML;

                if(banners) { 
                    Array.from(item.children).forEach((sub) => {
                        let _subName = sub.name;
                        let _subSlug = slug(_subName);
                        let _subBanner = banners.querySelector('.' + _subSlug);

                        sub['banner'] = '';

                        if (_subBanner && _subSlug) sub['banner'] = _subBanner.innerHTML;

                    });
                }
    
            });
        }
        dispatch(menuFetchDataSuccess(items));
    }
}

export function menuFetchData(url) {
    return dispatch => {
        dispatch(menuIsLoading(true));
        axios.get(url)
            .then(response => {
                dispatch(menuIsLoading(false));
                dispatch(menuFilterData(response.data));
                
                return null;
            })
            .catch((error) => dispatch(menuHasErrored(true)));
    }
}
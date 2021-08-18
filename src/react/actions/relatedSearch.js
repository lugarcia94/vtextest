import axios from 'axios';

// Maximo 50 itens por pagina
const itemsPerPage = 10;

export function fetchRelateds(id,search='',paged=1) {
    return (dispatch) => {
        let _from   = (paged - 1) * itemsPerPage;
        let _to     = ((paged - 1) * itemsPerPage) + (itemsPerPage - 1);
        let _total  = 0;
        let _paginate = {
          page: paged,
          total: _total
        };

        let flagSearch = false;
        let url = `/api/catalog_system/pub/products/search/?fq=specificationFilter_40:${id}&_from=${_from}&_to=${_to}`;

        if(search) {
            flagSearch = true;
            if(search.indexOf('-search-') !== -1) search = '';
            url = `/api/catalog_system/pub/products/search/?ft=${search}&fq=specificationFilter_40:${id}&_from=${_from}&_to=${_to}`;
            dispatch(searchRelateds(true));
        }


        dispatch(loadingRelateds(true));

        axios.get(url)
            .then(response => {
                let resources;

                if(response.headers.resources)
                    resources = response.headers.resources;

                if(resources) {
                    let old = resources.split('/');

                    if(old.length > 1)
                        _total = Math.ceil(parseInt(old[1]) / itemsPerPage);
                }

                _paginate['total'] = _total;
                dispatch(paginateRelateds(_paginate));

                return response.data;
            })
            .then(data => {
                dispatch(relateds(data));
                dispatch(loadingRelateds(false));

                if(flagSearch) {
                    dispatch(searchRelateds(false));
                }

                return null;
            })
            .catch(err => {
                dispatch(errorRelateds(false));
                dispatch(loadingRelateds(false));

                if(flagSearch) {
                    dispatch(searchRelateds(false));
                }

            });
    }
}

export function paginateRelateds(paginate) {
    return {
        type: 'RELATED_PAGINATE',
        paginate
    }
}

export function relateds(relateds) {
    return {
        type: 'RELATED_PRODUCTS',
        relateds
    }
}

export function loadingRelateds(loading) {
    return {
        type: 'RELATED_LOADING',
        loading
    }
}

export function searchRelateds(search) {
    return {
        type: 'RELATED_SEARCH',
        search
    }
}

export function errorRelateds(error) {
    return {
        type: 'RELATED_ERROR',
        error
    }
}
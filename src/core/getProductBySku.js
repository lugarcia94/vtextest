import axios from 'axios';
const SESSION_PRODUCTS_SKU_ALL = 'SESSION_PRODUCTS_SKU_ALL';

export default async function getProductById(id) {
    try {
        let products    = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem(SESSION_PRODUCTS_SKU_ALL)))) || [];
        let product     = products.filter((p) => p.id == id).map(p => p.product);

        if(product.length) 
            return product[0];

        const request   = await axios.get(`/api/catalog_system/pub/products/search/?fq=skuId:${ id }`);
        if(request.data.length === 0) return null;

        let item        = {};
        item.id         = id;
        item.product    = request.data[0];

        products.push(item);
        sessionStorage.setItem(SESSION_PRODUCTS_SKU_ALL, JSON.stringify(products));

        return item.product;
    } catch(e) {
        throw 'Erro na Requisição';
    }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadWishlist, update, buy } from '../../actions/wishlist';
import Product from './product';
import { loadHeart } from './index';
import { orderForm } from '../../reducers/core';

class painel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open    : false,
            product : [],
            products: [],
            eventID : 1,
            show    : true,
            time    : 3,
            checked : true,
            purchase: [],
            isBuyAll: false
        }
        this.handle    = this.handle.bind(this);
        this.selectALL = this.selectALL.bind(this);
        this.buyALL    = this.buyALL.bind(this);
        this.checkedBuyAll = this.checkedBuyAll.bind(this);
    }

    checkedBuyAll() {
        let checkedAll = Array.from(document.querySelectorAll('.c-wishlist__checkbox:checked'));
        let isBuyAll = false;
        if(checkedAll.length) 
            isBuyAll = true 
        this.setState({ isBuyAll });
    }
    
    buy (product) {
        let purchase = this.state.purchase;
        purchase.push(product);
        this.props.buy(purchase)
            .done((orderForm) => { 
                orderForm.items.forEach(item => {
                    purchase = purchase.filter((purch => purch.id != item.productId));
                    this.setState({ purchase });
                });
            });
    }

    buyALL(event) {
        event.preventDefault();
        this.checkedBuyAll(); 

        if(this.state.isBuyAll) {
            let form = event.target;
            let data = new FormData(form);
            let ids = Array.from(document.querySelectorAll('.c-wishlist__checkbox:checked')).map(checkbox => parseInt(checkbox.value));
            let { products, buy } = this.props;
            let buyProducts = products.filter((p) => ids.indexOf(p.id) != -1 ? true : false);
            if(buyProducts) buy(buyProducts);
        }
        
    }

    selectALL() {
        let radios = Array.from(document.querySelectorAll('.c-wishlist__checkbox'));
        let isBuyAll = false;
        radios.forEach(radio => {
            if( this.state.checked )    radio.checked = true;
            else                        radio.checked = false;
        });

        if(radios.filter((radio) => radio.checked).length)
            isBuyAll = true;
        this.setState({ checked: !this.state.checked, isBuyAll });
    
    }

    handle() {
        if(!this.state.open)    document.querySelector('body').classList.add('is-wishlist');
        else                    document.querySelector('body').classList.remove('is-wishlist');
        this.setState({ open: !this.state.open });

        let radios = Array.from(document.querySelectorAll('.c-wishlist__checkbox'));
        radios.forEach(radio => radio.checked = false );
        this.setState({ checked: true });
    }

    deleteEvent(product) {
        // window.setTimeout(function(){ 
            let products = this.state.product;
            let index    = products.map(p=> p.eventID).indexOf(product.eventID);
                products = products.filter((p, i) => i != index);
            this.setState({ product: products });
        // }.bind(this), 1000);
    }

    async remove(product) {
        let products = this.state.product;
        let index = products.map(p=> p.eventID).indexOf(product.eventID);
        
        if(index != -1) {
            products[index].show = false;
            this.setState({ product: products });
            await this.deleteEvent(product);
        }
    }

    async componentDidMount() {
        await this.props.load(this.props.id); 
        Array.from(document.querySelectorAll('.head-nav__link--wishlist')).forEach((link) => link.addEventListener("click", ( event ) => { event.preventDefault(); this.handle(); } ));
    }

    componentWillReceiveProps(nextProps) { 
        let { products } = this.props;
        if( products != nextProps.products && !this.props.loadding) {
            let product  = this.state.product;
            let productClone = {};
            let flag = false;
            let eventID = this.state.eventID;

            if(nextProps.products.length > products.length ) {
                let _product = nextProps.products.filter((product) => products.filter(_prod => product.id == _prod.id).length == 0);
                
                if(_product.length) {
                    productClone = JSON.parse(JSON.stringify(_product[0]));
                    productClone.action = 'creating';
                    productClone.eventID = eventID;
                }
                flag = true;
            } else {
                let _product = products.filter((product) => nextProps.products.filter(_prod => product.id == _prod.id).length == 0)
                if(_product.length) {
                    productClone = JSON.parse(JSON.stringify(_product[0]));
                    productClone.action = 'removing';
                    productClone.eventID = eventID;
                }
                flag = true;
            }
            if(flag && Object.keys(productClone).length) {
                productClone.show    = true;
                product.push(productClone);    
                this.setState({ product, show: product.length ? false : true, eventID: eventID + 1 });
                window.setTimeout(function(){ this.remove(productClone); }.bind(this), (1000 * this.state.time));
            }
        }
    }
    async update(id) {
        await this.props.update(id, this.props.wishlist);
        this.forceUpdate();
    }
    render() {
        const { show, product, checked, purchase }                      = this.state;
        const { loadding, removing, creating, products }                = this.props;
        let   flagShow                                                  = true;
        let   isLoadding                                                = true;
        const total                                                     = products.length;

        if(!loadding && !removing && !creating) isLoadding = false;
        
        if(products.length) flagShow = false; 
        
        return <div id="c-wishilist" data-loadding={isLoadding} className="c-wishlist" aria-hidden={ flagShow } aria-expanded={ this.state.open }>
            <div className="c-wishlist__container">
                <div className={ "c-wishlist__events" } aria-hidden={ show }>
                    { product.map( ( product, index ) => <div data-eventid={ product.eventID } key={ index } aria-hidden={ !product.show } className={ "c-wishlist__events-item c-wishlist__events-item--" + product.action }>
                        <div class="c-wishlist__event-header">
                            <h3 className="c-wishlist__event-title"> { product.action == 'creating' ? 'Produto Adicionado' : 'Produto Removido' } </h3>
                            <button type="button" onClick={() => this.remove(product)} className="c-wishlist__button c-wishlist__button--events-close">
                                Close    
                            </button>
                        </div>
                        <div className="c-wishlist__event-content">
                            <Product product={ product } /> 
                        </div>
                    </div>) }
                </div>
                <div className="c-wishlist__header">
                    <button onClick={ this.handle } className="c-wishlist__button c-wishlist__button--open">
                        <span className="c-wishlist__qtd">{ total }</span>
                        <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543 c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503 c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/></svg>
                    </button>
                </div>
                <div className="c-wishlist__main" >
                    <button type="button" className="c-wishlist__button c-wishlist__button--bg" onClick={ this.handle }><span>Close</span></button>
                    <form id="c-wishlist__form" onSubmit={this.buyALL} action="#">
                        { products.length ? <div className="c-wishlist__content">
                            <button type="button" className="c-wishlist__button c-wishlist__button--close" onClick={ this.handle }>
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249 C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
		C514.019,27.23,514.019,14.135,505.943,6.058z"/><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636 c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></svg>  
                            </button>
                            <div className="c-wishlist__content-header">
                                <div className="c-wishlist__content-title">Minha Lista de Desejos</div>
                                <button type="button" onClick={this.selectALL} className="c-wishlist__button c-wishlist__button--all">{ checked ? 'Selecionar Todos' : 'Deselecionar Todos' }</button>
                            </div>
                            <div className="c-wishlist__content-list">
                                { products.map( ( product, index ) => <div className={ 'c-wishlist__content-item ' + ( purchase.findIndex( p => p.id == product.id) != -1 ? 'c-wishlist__content-item--adding' : '' ) } key={ index }>
                                    <label className="c-wishlist__content-label" >
                                        <div className="c-wishlist__checkbox-box">
                                            <input onClick={this.checkedBuyAll} value={ product.id } type="checkbox" className="c-wishlist__checkbox" name="c-wishlist__checkbox[]" />
                                            <span className="c-wishlist__checkbox-span">
                                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" ><path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/></svg>
                                            </span>
                                        </div>
                                        <Product product={ product } />
                                        <div className="c-wishlist__actions">
                                            <button type="button" className="c-wishlist__button c-wishlist__button--remove" onClick={ () => this.update(product.id) } >
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><polygon points="404.176,0 256,148.176 107.824,0 0,107.824 148.176,256 0,404.176 107.824,512 256,363.824 404.176,512 512,404.176 363.824,256 512,107.824 "/></svg>
                                            </button>
                                            <button onClick={ () => this.buy(product) } type="button" className="c-wishlist__button c-wishlist__button--buy">Comprar</button>
                                        </div>
                                    </label>
                                </div>) }
                            </div>
                            <div className="c-wishlist__content-footer">
                                <button onClick={ this.buyALL.bind(this) } disabled={ !this.state.isBuyAll } type="submit" className="c-wishlist__button c-wishlist__button--buy">Comprar Selecionados</button>
                            </div>
                        </div> : <div className="c-wishlist__content c-wishlist__content--empty">
                            <button type="button" className="c-wishlist__button c-wishlist__button--close" onClick={ this.handle }>
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249 C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
		C514.019,27.23,514.019,14.135,505.943,6.058z"/><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636 c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></svg>  
                            </button>
                            <div className="c-wishlist__content-header">
                                <div className="c-wishlist__content-title">Minha Lista de Desejos</div>
                            </div>
                            <div className="c-wishlist__content-empty">
                                Lista de Desejo vazia.
                            </div>
                        </div>}
                    </form>
                </div>
            </div>
        </div>;
    }

}

painel.propTypes = {
    wishlist: PropTypes.object.isRequired,
    loadding: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    removing: PropTypes.bool.isRequired,
    creating: PropTypes.bool.isRequired,
    orderForm: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist,
        loadding: state.isLoadWishlist,
        products: state.products,
        removing: state.isRemoving,
        creating: state.isCreating,
        orderForm: state.wishlistOrderForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        load  : (id) => dispatch(loadWishlist(id)),
        update: (id, wishlist) => dispatch(update(id, wishlist)),
        buy   : (product) => dispatch(buy(product))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(painel);

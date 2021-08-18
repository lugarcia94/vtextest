import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import getProductById from 'Core/getProductById';
import Variants from './variants';
import { addToCart } from '../../actions/core';

import './style.styl';

class BuyButton extends Component {
    constructor(props) {
        super(props);

        this.buy = this.buy.bind(this);

        this.state = {
            item: {
                quantity: 1
            },
            seller: {},
            product: {
                items: []
            },
            sku: {},
            valid: false,
            msg: "",
            buying: false
        };
    } 

    async componentDidMount() {
        const product  = await getProductById(this.props.id); 
        let sku = product.items[0]; 

        this.setSku(sku);
        this.setState({ product});
    }

    setSku(sku) {
        const seller = sku.sellers.filter((seller) => seller.sellerDefault)[0];
        const item = {
            id: sku.itemId,
            quantity: 1,
            seller: seller.sellerId
        };
        let valid = false;

        if((parseInt(seller.commertialOffer.AvailableQuantity) >= item.quantity) && (item.quantity > 0))
            valid = true;

        this.setState({ sku, seller, item, valid, msg: '' });
    }

    async buy() {
        const { item } = this.state;
        this.setState({ buying: true });
        
        if( item.quantity > 0 ) {
            await this.props.buy([item]);
            this.setState({ buying: false });
        } else {
            this.setState({
                valid: false,
                buying: false,
                msg: "Adicione uma quantidade"
            });
        }

    }

    handleQTD(qtd) {
        const { seller, sku } = this.state;
        if(seller.commertialOffer.AvailableQuantity >= qtd) 
            this.setState({
                item: {
                    id: sku.itemId,
                    quantity: qtd,
                    seller: seller.sellerId
                },
                msg: "",
                valid: true
            });
        else if(qtd == '')
            this.setState({
                msg: "Adicione uma quantidade",
                valid: false
            });
        else 
            this.setState({
                msg: "Quantidade Maxima em estoque é " + seller.commertialOffer.AvailableQuantity,
                valid: false
            });
    }

    less() {
        let qtd = parseInt(this.state.item.quantity);

        if(qtd > 1) {
            qtd--;
        } else qtd = 1;

        this.handleQTD(qtd);
    }
    more() {
        let qtd = parseInt(this.state.item.quantity);
        
        if(!qtd) qtd = 1;
        else qtd++;

        this.handleQTD(qtd);
    }
    update(evt) {
        let qtd = parseInt(evt.target.value.replace(/[^\d]/,''));
        if(!qtd) qtd = '';
        this.handleQTD(qtd);
    }
    render() {
        let { item, product, valid, msg, buying } = this.state;
        let { quantity } = item;

        return (
            <div className={classNames({ "buy-button": true, "buy-button--add-product": this.state.hasAddProduct })}>
                { msg.length > 0 && <div className="buy-button__msg">{ msg }</div> }
                { product.items.length > 1 && <Variants onChange={ this.setSku.bind(this) } skus={ product.items } /> }
                <div className="buy-button__qtd">
                    <button className="buy-button__less" type="button" onClick={this.less.bind(this)} ><span>-</span></button>
                    <input className="buy-button__input" type="text" value={ quantity } onChange={this.update.bind(this)} />
                    <button className="buy-button__more" type="button" onClick={this.more.bind(this)}><span>+</span></button>
                </div>
                <button disabled={ !valid || buying } className="buy-button__button" type="button" onClick={this.buy}>
                    { buying ? 'Comprando...' : 'Comprar' }
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
        buy: (items) => dispatch(addToCart(items))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton);
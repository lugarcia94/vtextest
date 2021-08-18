import React, { Component } from 'react';
import { connect } from 'react-redux';

import getProductById from 'Core/getProductById';
import Product from './product';

import { wholesale } from '../../actions/wholesale';
import { addToCart } from '../../actions/core';

class Wholesale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: [],
            total: 0,
            buying: false
        };
    }
    async componentDidMount() {
        const product  = this.props.product;
        
        if(product.items) {
            product.salesChannel = this.props.sc;
            this.setState({ products: product.items });
        }

        Array.from(document.querySelectorAll('.product__buy')).forEach((button)=>{
            button.addEventListener('click', ()=> this.buy());
        });
    }
    async buy() {
        const { cart, buy }  = this.props;
        const { items } = cart;
        this.setState({ buying: true });
        this.buttonBuyDisabled(true);

        if(items.length) {
            await buy(items);
        }

        this.buttonBuyDisabled(false);
        this.setState({ buying: false });
            
    }
    onChange(item) {
        const cart = this.state.cart;
        const index = cart.findIndex((product) => product.id == item.id);
        
        if(index === -1)
            cart.push(item);
        else
            cart[index] = item;
            
        let total = this.state.total;
        total = cart.map((item) => item.quantity).reduce((a,b) => a + b, 0);

        this.setState({ cart, total });
        this.props.add(cart);
        this.buttonBuyDisabled(!total? true : false);
    }
    buttonBuyDisabled(disabled) {
        Array.from(document.querySelectorAll('.product__buy')).forEach((button)=>{
            button.disabled=disabled;
        });
    }
    render() {
        const { products, total, buying } = this.state;

        return <div className="variants">
            <h3 className="variants__title">Selecione a cor e quantidade desejada e clique em <span>COMPRAR PRODUTOS</span></h3>
            <div class="variants__list">
                { products.map((item, index) => <Product onChange={ this.onChange.bind(this) } key={ index } product={ item } /> ) }
            </div>
            <button onClick={this.buy.bind(this)} disabled={ !total || buying } type="button" className="variants__buy">COMPRAR PRODUTOS</button>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        cart    : state.wholesale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (item) => dispatch(wholesale(item)),
        buy: (items) => dispatch(addToCart(items))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wholesale);
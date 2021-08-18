import React, { Component } from 'react';
import { connect } from 'react-redux';
import getProductBySku from 'Core/getProductBySku';
import Config from 'Core/config.json';
import { currency } from 'Core/functions';

class WholesalePrice extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            price: 0,
            listPrice: 0
        }
    }
    componentDidUpdate(props) {
        if(props.cart != this.props.cart)
            this.onUpdate();
    }
    onUpdate(){
        const { cart } = this.props;
        const products = cart.items.filter((item) => item.quantity > 0).map(async (item) => { 
            const newCart   = { cart: item };
            const product   = await getProductBySku(item.id); 
            newCart.product = product.items.filter((prod) => prod.itemId == item.id)[0].sellers.filter((seller)=>seller.sellerId == Config.seller.id)[0].commertialOffer;
            return newCart;
        });

        (async () => {
            const result = await Promise.all(products);
            this.pricesUpdate(result);
        })();
    }
    pricesUpdate(products) {
        const price = products.map(item => item.product.Price * item.cart.quantity).reduce((a,b) => a+b, 0);
        const listPrice = products.map(item => item.product.ListPrice * item.cart.quantity).reduce((a,b) => a+b, 0);
        console.log(products);
        this.setState({price, listPrice});
    }
    render(){
        const { price, listPrice } = this.state;

        if(!price)
            return <React.Fragment></React.Fragment>;
        
        return <React.Fragment>
            <div className="from">{ currency(listPrice.toFixed(2)) }</div>
            <div className="to">{ currency(price.toFixed(2)) }</div>
        </React.Fragment>;
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.wholesale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WholesalePrice);
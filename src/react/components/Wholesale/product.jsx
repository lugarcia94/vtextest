import React, { Component } from 'react';
import Images from './images';
import Prices from './prices';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: {},
            quantity: 0
        };
    }

    async componentDidMount() {
        const { product } = this.props;
        let sellerProduct = product.sellers.filter((s) => s.sellerDefault);
        await this.setState({ seller: sellerProduct[0] });
    }

    componentDidUpdate(props,state) {
        if(this.state.quantity != state.quantity)
            this.onChange();
    }

    less() {
        let { quantity } = this.state;
        if(quantity - 1 >= 0) quantity -= 1;
        this.setState({ quantity });
    }

    more() {
        let { quantity, seller } = this.state;
        if((quantity + 1) <= seller.commertialOffer.AvailableQuantity)
            quantity += 1;
        this.setState({ quantity });
    }

    handle(evt) {
        let { seller } = this.state;
        let value = evt.target.value;
        if (value >= seller.commertialOffer.AvailableQuantity) value = seller.commertialOffer.AvailableQuantity;
        this.setState({ quantity: value });
    }

    handleValue(evt) {
        let value = evt.target.value;
        if(!value) value = 0;
        this.setState({ quantity: value });
    }

    onChange() {
        let item = {
            id: this.props.product.itemId,
            quantity: this.state.quantity,
            seller: this.state.seller.sellerId
        }
        this.props.onChange(item);
    }
    render() {
        const { product } = this.props;
        const { seller, quantity } = this.state;

        if(!Object.keys(seller).length) return <React.Fragment></React.Fragment>;

        return <React.Fragment>
            <div className="product__variant variant">
                <div className="variant__image">
                    <Images images={ product.images } />
                </div>
                <div className="variant__content">
                    <h3 className="variant__name">{ product.name }</h3>
                    <div className="variant__price">
                        <Prices commertialOffer={ seller.commertialOffer } />
                    </div>
                    <div className="variant__quantity">
                        <button disabled={ !quantity } onClick={ this.less.bind(this) } type="button" className="variant__quantity-button variant__quantity-button--less">-</button>
                        <input value={ quantity } onBlur={ this.handleValue.bind(this) } onChange={ this.handle.bind(this) } className="variant__quantity-input" type="number" />
                        <button disabled={ quantity >= seller.commertialOffer.AvailableQuantity } onClick={ this.more.bind(this) } type="button" className="variant__quantity-button variant__quantity-button--more">+</button>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default (Product)
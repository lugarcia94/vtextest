import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { currency } from "Core/functions";
import Product from './product';
import Gift from './gift';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {},
            item: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/catalog_system/pub/products/search?fq=productId:`+ this.props.id)
            .then(( data ) => {
                if(data.data.length) {
                    let product = data.data[0];
                    let item = product.items[0];

                    this.setProduct(product);
                    this.setItem(item);
                }

            });
    }

    setItem(item) {
        this.setState({ item });
    }

    setProduct(product) {
        this.setState({ product });
    }

    render() {
        let product         = this.state.product;
        let item            = this.state.item;
        let listPrice       = 0,
            price           = 0,
            buyLink         = '',
            offer           = false,
            installments    = [],
            images          = '',
            kitItems        = [],
            giftSkuIds      = [],
            giftHTML        = '';


        if (!Object.keys(product).length)
            return <div></div>;

        let name            = product.productName;
        let description     = product.metaTagDescription;
        let link            = product.link;

        let seller          = item.sellers;

        if(item.images) {
            images       = item.images[0].imageUrl;
        }

        if(item.isKit) {
            kitItems     = item.kitItems;
        }

        if(seller) {
            seller          = seller[0];
            listPrice       = seller.commertialOffer.ListPrice.toFixed(2);
            price           = seller.commertialOffer.Price.toFixed(2);
            installments    = seller.commertialOffer.Installments;
            giftSkuIds      = seller.commertialOffer.GiftSkuIds;
            buyLink         = seller.addToCartLink;

            if(seller.commertialOffer.ListPrice != seller.commertialOffer.Price) offer = true;

            installments = installments.reduce((old, installment) => {
                if( !old ) return installment;
                else if ( old.NumberOfInstallments < installment.NumberOfInstallments) return installment;

                return old;
            });

            if(giftSkuIds.length)
                giftHTML = <Gift gifts={giftSkuIds} />;

        }

        return <div className="showcase showcase--kit">
            <div className="showcase__kit">
                <article className="showcase__item  showcase__item--kit" itemScope="" itemType="http://schema.org/SomeProducts">
                    <figure className="showcase__image" role="presentation" title={ name } itemProp="image">
                        <a className="showcase__link showcase__link--image" href={link} itemProp="url" tabIndex="0">
                            <img src={ images } width="240" height="240" />
                        </a>
                    </figure>
                    <div className="showcase__main">
                        <h1 className="showcase__name" itemProp="name">
                            <a className="showcase__link showcase__link--name" href={link} itemProp="url" tabIndex="0">
                                { name }
                            </a>
                        </h1>

                        <div className="review showcase__review review__short review__short--list">
                            <span className={ "rating-produto avaliacao" + this.props.rate }>{ this.props.rate }</span>
                            <span className="review__star review__star--small"></span>
                        </div>

                        <div className="showcase__description">
                            { description }
                        </div>

                        <div className="showcase__prices">
                            { offer ? <div>
                                <div className="valor-de price__price">
                                    { currency(listPrice) }
                                </div>
                                <div className="valor-por price__best-price">
                                    <strong>{ currency(price) }</strong>
                                </div>
                                <div className="installment price__installment">
                                    <strong>{ installments.NumberOfInstallments }x</strong> de <strong>{ currency( parseFloat(installments.Value).toFixed(2) )}</strong>
                                </div>
                            </div> : <div>
                                <div className="valor-por price__best-price">
                                    { currency(listPrice) }
                                </div>

                                <div className="installment price__installment">
                                    <strong>{ installments.NumberOfInstallments }x</strong> de <strong>{ currency( parseFloat(installments.Value).toFixed(2) )}</strong>
                                </div>

                            </div> }
                        </div>

                        { giftHTML }

                        <div className="showcase__actions">
                            <a className="showcase__button showcase__button--buy" href={ buyLink }>Comprar Kit</a>
                        </div>
                    </div>
                </article>
            </div>
            <Product items={ kitItems } />
        </div>;

    }
}


Item.propTypes = {

};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Item);
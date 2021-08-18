import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import axios from 'axios';
import {currency} from "Core/functions";

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentWillMount() {
        this.fetch(this.props.items);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.items.length != this.props.items.length) {
            this.setState({ items: [] });
            this.fetch(nextProps.items);
        }
    }

    fetch( items ) {
        items.forEach(item => {
            let id = item.itemId;
            axios.get(`/api/catalog_system/pub/products/search?fq=skuId:${ id }`)
                .then((data) => {
                    let items = this.state.items;

                    if(data.data.length) {
                        let tmp = [];
                        tmp = data.data[0].items.filter( item => item.itemId == id);

                        if(tmp.length) items.push(tmp[0]);

                    }

                    this.setState({ items });
                });
        });
    }

    render() {
        let items = this.state.items;

        return <div className="showcase__items">
            { items.map( ( item, index ) => {
                let name            = item.name,
                    listPrice       = 0,
                    price           = 0,
                    buyLink         = '',
                    offer           = false,
                    images          = '';

                let seller          = item.sellers;

                if(seller) {
                    seller          = seller[0];
                    listPrice       = seller.commertialOffer.ListPrice.toFixed(2);
                    price           = seller.commertialOffer.Price.toFixed(2);
                    buyLink         = seller.addToCartLink;

                    if(seller.commertialOffer.ListPrice != seller.commertialOffer.Price) offer = true;
                }

                if(item.images) {
                    images       = item.images[0].imageUrl;
                }

                return <article key={ index } className="showcase__item  showcase__item--row" itemScope="" itemType="http://schema.org/SomeProducts">
                    <figure className="showcase__image" role="presentation" title={ name } itemProp="image">
                        <img src={ images } width="240" height="240" />
                    </figure>
                    <div className="showcase__main">
                        <h1 className="showcase__name" itemProp="name">
                            { name }
                        </h1>

                        { offer ? <div className='showcase__prices'>
                            <div className="valor-de price__price">
                                { currency(listPrice) }
                            </div>
                            <div className="valor-por price__best-price">
                                <strong>{ currency(price) }</strong>
                            </div>
                        </div> : <div className='showcase__prices'>
                            <div className="valor-por price__best-price">
                                { currency(listPrice) }
                            </div>
                        </div> }

                        <div className="showcase__actions">
                            <a className="showcase__button showcase__button--buy" href={ buyLink }>Comprar</a>
                        </div>
                    </div>
                </article>;
            } ) }

        </div>;
    }
}


Product.propTypes = {

};

const mapStateToProps = ( state ) => {
    return {
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
    };
};


export default connect( mapStateToProps, mapDispatchToProps )( Product );
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: []
        }

    }
    componentWillMount() {
        if(this.props.category) {
            axios.get('/api/catalog_system/pub/products/search?fq=C:' + this.props.category + '&_from=1&_to=1')
                .then(response => {
                    this.setState({ product: response.data });
                });
        }
    }

    render() {
        let product = this.state.product[0];

        if( product == undefined)
            return (<div className="empty"></div>);

        let price = product.items[0].sellers[0].commertialOffer.Price;
        let listPrice = product.items[0].sellers[0].commertialOffer.ListPrice;

        return (
            <article className="product-list__item border" data-sku="1" itemscope="" itemtype="http://schema.org/SomeProducts">
                <a href={product.link}>
                    <figure className="image" role="presentation">
                        <img src="/arquivos/product01.jpg"/>
                    </figure>
                    <div className="group">
                        <h1 className="name" itemprop="name">{product.productName}</h1>
                        <div className="price" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                            {listPrice ?
                                <span className="valor-de price-list-price"><strong>{new Intl.NumberFormat('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(listPrice)}</strong></span>
                                : <span className="valor-de price-list-price"><strong></strong></span>
                            }
                            <span className="valor-por price-best-price" itemprop="price">
                                <strong>{new Intl.NumberFormat('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(price)}</strong>
                            </span>
                            <span className="valor-dividido price-installments">
                                <strong className="number">9x</strong>de<strong className="value">R$ 56,65</strong>
                            </span>
                            <link itemprop="availability" href="http://schema.org/InStock"/>
                        </div>
                        <div className="btn-actions">
                            <a className="link btn-cart waves-effect" itemprop="url">
                                <i className="icon-cart btn-cart"></i>
                                <span className="e-hide-up@md">Comprar</span>
                            </a>
                        </div>
                    </div>
                </a>
            </article>
        );
    }

}

Product.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

var htmlAme = '<div id="personAlert" style="text-align: center;"><p style="font-size:0.8em"><span>ou Compre com</span> <img src="/arquivos/ame-digital.png" 50px"="" style="display: inline-block"><span>e receba até 5% de volta</span></p></div>'
$(htmlAme).insertAfter(".plugin-preco");


export default connect(mapStateToProps, mapDispatchToProps)(Product);

import React, { Component } from 'react';
import getProductById from 'Core/getProductById';
import { slug } from 'Core/functions';

class Attr extends Component {
    constructor(props) {
        super(props);
        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
            product: {},
            attrs: []
        };
    }

    toggleClass(evt) {
        evt.currentTarget.closest('div').classList.toggle('on__text');
    };

    async componentDidMount() {
        const { name } = this.props;
        const current  = await vtexjs.catalog.getCurrentProductWithVariations();
        const product  = await getProductById(current.productId);
        const attrs    = [];

        if(product[name])
            product[name].forEach((item)=>{
                const newItem = {};
                newItem.label = item;
                let value = '';
                product[item].forEach((val => value += val));
                newItem.value = value;
                attrs.push(newItem);
            });
        
        this.setState({ product, attrs });

    }
    render() {
        const { name } = this.props;
        const { attrs, active } = this.state;

        if(!attrs.length) return <React.Fragment></React.Fragment>;

        return <React.Fragment>
            <div className="product__attrs attrs">

                <div className="attrs__header">
                    <h3 className="attrs__title">{ name }</h3>
                </div>
                <div className="attrs__container">
                    <div className="attrs__case">
                        { attrs.map((attr, attrIndex) => <div className={ 'product__attr product__attr--' + slug( attr.label ) } key={attrIndex}>
                            { attr.value.toLowerCase() == 'sim' || attr.value.toLowerCase() == 'não' ? <React.Fragment>
                                { attr.value.toLowerCase() && <span className="product__attr-label">{ attr.label }</span> }
                            </React.Fragment> : <React.Fragment>
                                <span className="product__attr-label">{ attr.label }<span className="product__attr-div">:</span> </span>
                                <span onClick={this.toggleClass} className="product__attr-value">{ attr.value }</span>
                            </React.Fragment> }
                            
                        </div>) }
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}

export default (Attr)
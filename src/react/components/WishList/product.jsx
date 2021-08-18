import React, { Component } from 'react';

class product extends Component {
    
    render() {
        let { product, className } = this.props;
        className = className || 'c-product';

        return <div className={ className }>
            <div className={ className + '__container' }>
                <figure className={ className + '__figure' }>
                    <a className={ className + '__link' } href={product.link}>
                        <img className={ className + '__image' } src={ product.image.url } alt={ product.image.label } />
                    </a>
                </figure>
                <div className={ className + '__content' }>
                    <a className={ className + '__link' } href={product.link}>
                        <span className={ className + '__name' }>{ product.name }</span>
                    </a>
                </div>
            </div>
        </div>;
    }
}

export default ( product );
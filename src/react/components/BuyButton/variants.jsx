import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from "react-slick";

const  settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};

class Variants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }
    handle(index) {
        this.setState({ index });
        this.props.onChange(this.props.skus[index]);
    }
    render() {
        const { skus } = this.props;
        const { index } = this.state;

        return <div className="buy-button__variants">
            <Slider {...settings}>
                { skus.map((sku, key) => <div className={ classNames('buy-button__variant', { 'buy-button__variant--actived': key == index }) } onClick={this.handle.bind(this,key)} key={ key }><img width={ 55 } height={ 55 } src={  sku.images[0].imageUrl } /></div>) }
            </Slider>
        </div>;
    }
}

export default (Variants);
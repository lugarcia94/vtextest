import React, { Component } from 'react';
import Slick  from 'react-slick';
import Item from './item';

import './style.styl';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};


class Kits extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        Array.from(document.querySelectorAll('[data-component=kits]')).forEach( kit => kit.classList.add('kits--actived') );
    }

    render() {
        let title = this.props.title;

        if(title.split('-').length > 1) {
            title = title.split('-');
            title = <h2 className="showcase__title"><strong> { title[0] }</strong> { title[1] }</h2>;
        } else {
            title = <h2 className="showcase__title"><strong>{ title }</strong></h2>;
        }

        return <div class="kits__container">
            { title }

            <Slick {...settings}>
                {this.props.ids.map( (id, index) => <Item key={ index } rate={this.props.rate[index]} id={ id } />)}
            </Slick>
        </div>;
    }
}


export default Kits;
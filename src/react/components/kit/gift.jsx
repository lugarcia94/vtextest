import React, { Component } from 'react';
import axios from 'axios';

class Gift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.update(this.props.gifts);
    }

    update(ids) {
        let items = [];
        this.setState({items});

        ids.forEach(id => axios.get(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
            .then(data => this.mount(data.data[0].items.filter(item => item.itemId == id)[0])));
    }

    mount(data) {
        let items = this.state.items;
        items.push(data);
        this.setState({ items });
    }
   
    render() {
        let items = this.state.items;

        return <div className="gift">
            { items.map( (item, index) => {
                let images  = '';
                let name    = item.name;

                if(item.images) {
                    images       = item.images[0].imageUrl;
                }

                return <article key={ index } className="showcase__item  showcase__item--row" itemScope="" itemType="http://schema.org/SomeProducts">
                    <figure className="showcase__image" role="presentation" title={ name } itemProp="image">
                        <img src={ images } width="60" height="60" />
                    </figure>
                    <div className="showcase__main">
                        <h3 className="showcase__gift-title">Ganhe Brinde</h3>
                        <h1 className="showcase__name" itemProp="name">{ name }</h1>
                    </div>
                </article>;
            } ) }
        </div>;
    }
}

export default Gift;
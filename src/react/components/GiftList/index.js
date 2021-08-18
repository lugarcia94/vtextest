import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class GiftList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 4,
            list: [],
            headers: {
                headers: {
                    // 'x-vtex-api-appkey': 'auahadevelopers@auaha.com.br',
                    // 'x-vtex-api-apptoken': 'Auaha123456,,,1'
                }
            }

        }
    }

    componentWillMount() {
        this.firstSku();
    }

    firstSku() {
        if(this.props.id ) {
            axios.get('/api/catalog_system/pub/products/variations/' + this.props.id, this.state.headers).then(response => {

                let data = response.data.skus;
                let flag = true;

                data.filter(item => {

                    if (flag && item.available) {
                        flag = false;
                        return true;
                    } else return false;

                });

                if (data.length) {
                    let id = data[0].sku;
                    this.getList(id);
                }
            });
        }
    }

    getList(sku) {

        axios.post('/no-cache/giftlistv2/getinsertsku/'+this.state.id+'/list')
            .then((response) => {
                let data = response.data;
                let list = [];

                $('.glis-li a', data).each(function () {
                    let item = {
                        id: $(this).attr('rel'),
                        text: $(this).text(),
                        data: {
                            GiftListId: $(this).attr('rel'),
                            CheckedItems: [sku + '-1'],
                            AddToQuantity: true
                        }
                    };
                    list.push(item);
                });

                this.setState({list: list});

            });

    }

    redirect() {
        location.href = "/account";
    }

    add() {
        if(this.props.orderForm.loggedIn) {
            if(this.state.list.length > 0) {
                axios.post('/no-cache/giftlistv2/skutolist', this.state.list[0].data, this.state.headers)
                    .then(()=> location.href = '/giftlist/manage/');

            } else location.href = '/giftlist/create';
        } else this.redirect();

    }

    render() {

        return (
            <button type="button" class="giftlist-link" onClick={() => this.add() } itemprop="url"><i class="icon icon-heart"></i> <span>ADICIONAR A <strong>LISTA DE DESEJO</strong></span></button>
        );
    }

}

GiftList.propTypes = {
    orderForm: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        orderForm: state.orderForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(GiftList);



import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { fetchRelateds } from "../../actions/relatedSearch";
import Paginate from '../Paginate';

class relatedSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: ''
        };

        this.handleWord     = this.handleWord.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleLink     = this.handleLink.bind(this);
    }

    componentDidMount() {
        this.props.fetch(this.props.id, this.state.word, this.state.page);
        $(window).on('skuSelected.vtex', function(evt, productId, sku) {
        });
    }

    load(page) {
        this.props.fetch(this.props.id, this.state.word, page);
    }

    handleWord(evt) {
        this.setState({word: evt.target.value});
    }

    handleSubmit(evt) {
        let value = this.state.word;
        evt.preventDefault();

        if(!value) value = '-search-';
        this.props.fetch(this.props.id, value, 1);
    }

    handleLink(evt) {
        let index = evt.currentTarget.getAttribute('data-index');
        window.location.href = this.props.relateds[index].link;
    }

    render() {
        let {relateds, paginate, loading, search, error} = this.props;

        return <section className="product-parts__related">
            <form onSubmit={this.handleSubmit} action="" className={classNames({'product-parts__form': true, 'product-parts__form--loading': search})}>
                <div className="product-parts__search">
                    <p className="product-parts__text">Faça a busca de sua peça</p>
                    <input
                        type="text"
                        id="search-parts"
                        className="product-parts__search-parts"
                        placeholder="Busque por nome, Marca ou Modelo"
                        value={this.state.word}
                        onChange={this.handleWord}/>
                    <button className="product-parts__search-button">Enviar</button>
                </div>
            </form>

            {relateds.length ? <div>

                <div className={classNames({ 'product-parts__table': true, 'product-parts__table--loading': loading})}>
                    <table className="product-parts__table-list">

                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Péça</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {relateds.map((related, index) => <tr onClick={this.handleLink} data-index={index} key={index}>
                                <td>{ related.productReference }</td>
                                <td>{ related.productName }</td>
                                <td>{ related['Quantidade'] }</td>
                            </tr> )}
                        </tbody>

                    </table>
                </div>

                <div className="product-parts__paginates">
                    <Paginate fetch={(page) => this.load(page)} page={paginate.page} total={paginate.total} />
                </div>

            </div>:<div></div>}

        </section>;
    }

}

relatedSearch.propTypes = {
    relateds: PropTypes.array.isRequired,
    paginate: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    search: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        relateds: state.relateds,
        paginate: state.paginateRelateds,
        loading: state.loadingRelateds,
        search: state.searchRelateds,
        error: state.errorRelateds
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (id, word, paged) => dispatch(fetchRelateds(id, word, paged))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(relatedSearch);

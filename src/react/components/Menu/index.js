import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuFetchData, menuToggle } from '../../actions/menu';
import { menuAdjustment } from '../../../core/functions/menu';

// import Product from '../Product'

import './style.styl';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleExpanded = this.handleExpanded.bind(this);
    }
    componentDidUpdate() {
        menuAdjustment();
    }
    componentWillMount() {
        this.props.fetchData('/api/catalog_system/pub/category/tree/3');
        this.resize(this);
        window.addEventListener('resize', () => this.resize(this));
    }
    resize(self) {
        if (window.innerWidth < 992) self.setState({ mobile: true });
        else self.setState({ mobile: false });
    }
    renderHtml(list, nofollow = false, classname = 'categories', nivel = 0, limit = 0) {
        if (limit > 0) list = list.slice(0, limit);

        return list.map((item) => {
            let sub = '';
            let options = {};
            let attr = {};

            options['title'] = item.name;
            options['className'] = 'menu__link ' + 'menu__link--nv' + nivel;
            options['data-name'] = item.name;
            attr['className'] = 'menu__item ' + 'menu__item--nv' + nivel;

            //<Product category={item.id}/>

            if (nofollow) options['rel'] = 'nofollow';
            if (item.children.length) {
                let ulAttr = {};
                ulAttr['className'] = 'menu__' + classname + ' menu__' + classname + '--nv' + (nivel + 1);
                attr['className'] = attr['className'] + ' menu__item--has-child';
                attr['aria-expanded'] = false;
                sub = (
                    <div {...ulAttr} onClick={e => {
                        let body = document.querySelector('body');

                        if (e.target.classList.contains('menu-categories')) {
                            e.currentTarget.parentElement.classList.remove('active');
                            body.classList.remove('mn-active');
                        }
                    }}>
                        <div className="menu__sub-inner">
                            <ul className="menu__list">
                                {this.renderHtml(item.children, nofollow, classname, (nivel + 1))}
                            </ul>
                        </div>
                        {classname == 'categories' && !this.state.mobile && item.brand &&
                            <div class="brand category__brands" dangerouslySetInnerHTML={{ __html: item.brand }}></div>
                        }
                        {classname == 'categories' && !this.state.mobile && item.banner &&
                            <div class="banner" dangerouslySetInnerHTML={{ __html: item.banner }}></div>
                        }
                    </div>
                );
            }

            return (
                <li {...attr} key={item.id} onClick={this.handleExpanded} >
                    <a href={item.url} {...options} >
                        {typeof item.icon != 'undefined' && item.icon != "" && classname == 'categories' && !this.state.mobile &&
                            <span class="menu__icon" dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                        }
                        {typeof item.banner != 'undefined' && item.banner != "" && nivel > 0 && classname == 'categories' && !this.state.mobile &&
                            <span class="menu-banner-link" dangerouslySetInnerHTML={{ __html: item.banner }}></span>
                        }
                        <span>{item.name}</span>
                    </a>
                    {sub}
                </li>
            );
        });
    }

    handleExpanded(evt) {
        if (evt.target.classList.contains('menu__item--has-child')) {
            evt.target.setAttribute('aria-expanded', !(evt.target.getAttribute('aria-expanded') == 'true'));
        }
    }

    handleClick() {
        document.querySelector('body').classList.remove('is-menu');
        document.querySelector('.button__menu').classList.remove('button__menu--close');
    }

    allCategory() {
        if (this.state.mobile)
            return;
        else {
            let list = this.renderHtml(this.props.items, true, 'menu__categories-all');
            return (
                <li class="menu__categories-all">
                    <span class="menu__categories-all__name">
                        Toda loja
                    </span>
                    <div className="menu__categories-all--inner">
                        <ul class="menu__categories-all--nv0">
                            {list}
                        </ul>
                    </div>
                </li>
            );
        }
    }

    render() {
        let list = this.renderHtml(this.props.items, false, 'categories', 0, 8);
        let allCategory = this.allCategory();
        let { slot } = this.props;

        if (this.props.hasErrored) {
            return (<div aria-expanded={this.props.expanded} class={(this.state.mobile ? 'menu--mobile' : 'menu--desktop')} role="menubar" >OPS!! Ocorreu algum erro no Carregamento . . .</div>);
        }

        if (this.props.isLoading) {
            return (
                <div aria-expanded={this.props.expanded} className={(this.state.mobile ? 'menu--mobile' : 'menu--desktop')} role="menubar">
                    <div className="menu__container">

                        <nav className="menu__nav">
                            {this.state.mobile &&
                                <header className="menu__header">
                                    <h1 className="menu__title">Menu de Categorias</h1>
                                    <button onClick={this.handleClick} className="menu__close" type="button"><span>Close</span></button>
                                    <div className="menu__user">
                                        <ul className="menu__user-list">
                                            <li className="menu__user-list-item">
                                                <a className="menu__user-list-link menu__user-list-link--user" href="/account">Minha Conta</a>
                                            </li>
                                            <li className="menu__user-list-item">
                                                <a className="menu__user-list-link menu__user-list-link--orders" href="/account/orders">Pedidos</a>
                                            </li>
                                            <li className="menu__user-list-item">
                                                <a className="menu__user-list-link menu__user-list-link--mail" href="/contato">Contato</a>
                                            </li>
                                            <li className="menu__user-list-item">
                                                <a className="menu__user-list-link menu__user-list-link--help" href="/institucional/ajuda">Ajuda</a>
                                            </li>
                                        </ul>
                                    </div>
                                </header>
                            }
                            <ul className="menu__categories menu__categories--nv0"></ul>
                        </nav>

                    </div>
                </div>
            );
        }

        return (
            <div aria-expanded={this.props.expanded} class={(this.state.mobile ? 'menu--mobile' : 'menu--desktop')} role="menubar" >
                <div class="menu__container" >
                    <nav class="menu__nav">
                        {this.state.mobile &&
                            <header class="menu__header">
                                <button onClick={this.handleClick} class="menu__close" type="button"><span>Close</span></button>
                                <div className="menu__account">
                                    <a href="/account" title="minha conta">
                                        <span>Olá :)</span>
                                        <span>Minha conta</span>
                                    </a>
                                </div>
                            </header>
                        }
                        <ul class="menu__categories menu__categories--nv0">
                            {list}
                            {allCategory}
                        </ul>
                        {this.state.mobile}
                    </nav>
                </div>
            </div>
        );
    }

}

Menu.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.menu,
        hasErrored: state.menuHasErrored,
        isLoading: state.menuIsLoading,
        expanded: state.menuExpanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(menuFetchData(url)),
        toggle: (bool) => dispatch(menuToggle(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

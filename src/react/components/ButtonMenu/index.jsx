import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuToggle } from '../../actions/menu';

import './style.styl';

class ButtonMenu extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if(this.props.expanded) this.props.toggle(false);
        else this.props.toggle(true);
    }
    render() {
        return(
            <button onClick={this.handleClick} class="button button--menu" type="button">
                Menu Categorias
            </button>
        );
    }
}

ButtonMenu.propTypes = {
    expanded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        expanded: state.menuExpanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: (bool) => dispatch(menuToggle(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonMenu);

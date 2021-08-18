import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class paginate extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        let _page = parseInt(evt.target.textContent);
        this.props.fetch(_page);
    }

    paginateHTML(num, key) {
        if(num == this.props.page)
            return <li key={key} className="paginate__item paginate__item--current">
                <button type="button" disabled={true} className="paginate__link paginate__link--current"> {num} </button>
            </li>;

        return <li key={key} className="paginate__item">
            <button onClick={this.handleClick} className="paginate__link" > {num} </button>
        </li>;
    }

    render() {
        let {total,page} = this.props;
        let first = true, prev = true;
        let next = false, last = false;

        if(page > 1)
            first = prev = false;

        if(page >= total)
            last = next = true;

        if(total <= 1)
            return <div className="paginate"></div>;

        return <div className="paginate">
            <div className="paginate__first">
                <button
                    type="button" className="paginate__first-button"
                    disabled={first}
                    onClick={()=> this.props.fetch(1) }>First</button>
            </div>
            <div className="paginate__prev">
                <button
                    type="button" className="paginate__prev-button"
                    disabled={prev}
                    onClick={()=>this.props.fetch(page - 1)}>Prev</button>
            </div>
            <ul className="paginate__list">
                {Array.range(1,(total + 1)).map((page, key) => this.paginateHTML(page, key))}
            </ul>
            <div className="paginate__next">
                <button
                    type="button" className="paginate__next-button"
                    disabled={next}
                    onClick={()=>this.props.fetch(page+1)}>Next</button>
            </div>
            <div className="paginate__last">
                <button
                    type="button" className="paginate__last-button"
                    disabled={last}
                    onClick={()=>this.props.fetch(total)}>Last</button>
            </div>
        </div>;
    }

}

paginate.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(paginate);

import React from "react";
import './svg/icon-heart.svg';

const Icon = (props) => (
    <svg className={ `${props.name} icon` }>
        <use xlinkHref={ `#icon-${ props.name }` } />
    </svg>
);

export default Icon; 
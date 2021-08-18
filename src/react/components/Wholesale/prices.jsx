import React from 'react';
import { currency } from 'Core/functions';

export default (props) => {
    const { commertialOffer } = props;
    return <div className="variant__prices">
        {/* { currency(commertialOffer.ListPrice.toFixed(2)) } */}
        { currency(commertialOffer.Price.toFixed(2)) }
    </div>
}
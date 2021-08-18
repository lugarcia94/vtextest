import React from 'react';

export default (props) => {
    const { images } = props;
    return <img src={ images[0].imageUrl } title={ images[0].imageLabel } />
};
import React from 'react';

import Img from './Img';

interface Props {
  imageNames: Array<string>;
}

const ProductDetailImages: React.FC<Props> = ({ imageNames }) => {
  return (
    <div className={`product-detail__content__images`}>
      {imageNames.map((img, i) => (
        <Img key={img + i} src={`/img/products/${img}`} />
      ))}
    </div>
  );
};

export default ProductDetailImages;

import React from 'react';

import Img from './Img';

interface Props {
  src: string;
}

const ProductsCover: React.FC<Props> = ({ src }) => {
  return (
    <div className={`products-cover`}>
      <Img src={`/img/products/${src}`} />
    </div>
  );
};

export default ProductsCover;

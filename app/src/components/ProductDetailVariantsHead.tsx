import React from 'react';

import ProductDetailVariantsHeadItem from './ProductDetailVariantsHeadItem';

interface Props {
  labels: Array<string>;
}

const ProductVariantsHead: React.FC<Props> = ({ labels }) => {
  return (
    <div className={`variants__head`}>
      {labels.map(label => (
        <ProductDetailVariantsHeadItem key={label} label={label} />
      ))}
    </div>
  );
};

export default ProductVariantsHead;

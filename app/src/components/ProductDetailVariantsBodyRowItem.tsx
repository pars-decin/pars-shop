import React from 'react';

interface Props {
  text: string;
}

const ProductDetailVariantsBodyRowItem: React.FC<Props> = ({ text }) => {
  return <div className={`variants__body__row__item`}>{text}</div>;
};

export default ProductDetailVariantsBodyRowItem;

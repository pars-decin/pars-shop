import React from 'react';

interface Props {
  label: string;
}

const ProductVariantsHeadItem: React.FC<Props> = ({ label }) => {
  return <div className={`variants__head__item`}>{label}</div>;
};

export default ProductVariantsHeadItem;

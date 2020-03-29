import React from 'react';

interface Props {
  label: string;
}

const ProductsLabel: React.FC<Props> = ({ label }) => {
  return (
    <div className={`products-label`}>
      <h1>{label}</h1>
    </div>
  );
};

export default ProductsLabel;

import React from 'react';

interface Props {
  name: string;
  perex: string;
  specification: string;
}

function transformSpecification(specification) {
  const specificationRows = specification.split('\n\n');
  let body = [];
  let header = [];

  specificationRows.forEach(row => {
    const cols = row.split('\n');
    header = [...header, cols[0]];
    body = [...body, cols[1]];
  });

  return { header, body };
}

const ProductDetailHead: React.FC<Props> = ({ name, perex, specification }) => {
  const specsData = transformSpecification(specification);
  return (
    <div className={`product-detail__content__head`}>
      <h1>{name}</h1>
      <p>{perex}</p>
      <h2>Specifikace</h2>
      <div className={`product-detail__content__head__specs`}>
        <div className={`product-detail__content__head__specs__header`}>
          {specsData.header.map(x => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className={`product-detail__content__head__specs__body`}>
          {specsData.body.map(x => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHead;

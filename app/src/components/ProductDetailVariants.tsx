import React from 'react';

import { DataProvider } from '../hocs/dataContext';
import { Product } from '../types';

import ProductDetailVariantsHead from './ProductDetailVariantsHead';
import ProductDetailVariantsBody from './ProductDetailVariantsBody';

interface Props {
  variantsId: Array<string>;
}

const findVariants = (
  products: Array<Product>,
  ids: Array<string>
): Array<Product> => {
  const matches = products.reduce((acc, curr): Array<Product> => {
    if (ids.includes(curr.productId)) {
      return [...acc, curr];
    }
    return acc;
  }, []);

  return matches;
};

const filterProductsWithAttributes = (
  products: Array<Product>,
  attributes: Array<string>
): Array<Array<string>> => {
  const selectAttributes = (product: Product) => {
    let data: Array<string> = [];
    attributes.forEach(attribute => {
      data = [...data, product[attribute]];
    });
    return data;
  };

  return products.map(product => selectAttributes(product));
};

const ProductVariants: React.FC<Props> = ({ variantsId }) => {
  const { products, staticData } = React.useContext(DataProvider);
  const { productDetailVariants } = staticData;
  const matchedVariants = findVariants(products, variantsId);
  const rowsData = filterProductsWithAttributes(
    matchedVariants,
    Object.keys(productDetailVariants)
  );
  return (
    <div className={`variants`}>
      <ProductDetailVariantsHead
        labels={Object.values(productDetailVariants)}
      />
      <ProductDetailVariantsBody
        labels={Object.values(productDetailVariants)}
        rowsData={rowsData}
      />
    </div>
  );
};

export default ProductVariants;

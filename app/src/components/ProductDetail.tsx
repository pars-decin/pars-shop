import React from 'react';

import Img from '../components/Img';
import ProductDetailHead from './ProductDetailHead';
import ProductVariants from './ProductDetailVariants';
import ProductDetailImages from './ProductDetailImages';

import { DataProvider } from '../hocs/dataContext';

interface Props {
  uid: string;
}

const ProductDetail: React.FC<Props> = ({ uid }) => {
  const { shopItems } = React.useContext(DataProvider);
  const productData = shopItems.find(item => item.uid === uid);

  const {
    name,
    perex,
    specification,
    productImage,
    productIds,
    imageNames,
  } = productData;

  return (
    <div className={`product-detail`}>
      <div className={`product-detail__content`}>
        <ProductDetailHead
          name={name}
          perex={perex}
          specification={specification}
        />
        <h2>Varianty</h2>
        <ProductVariants variantsId={productIds} />
        <h2>Obrázky</h2>
        <ProductDetailImages imageNames={imageNames} />
      </div>
      <div className={`product-detail__cover`}>
        <Img src={`/img/products/${productImage}`} />
      </div>
    </div>
  );
};

export default ProductDetail;

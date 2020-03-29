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

  const shopItem = shopItems.find(({ shopItemId }) => shopItemId === uid);

  const { name, description, specification, coverPhoto, imageNames } = shopItem;

  return (
    <div className={`product-detail`}>
      <div className={`product-detail__content`}>
        <ProductDetailHead
          name={name}
          perex={description}
          specification={specification}
        />
        <h2>Varianty</h2>
        <ProductVariants variantsId={uid} />
        {imageNames.length !== 0 && (
          <>
            <h2>Obrázky</h2>
            <ProductDetailImages imageNames={imageNames} />
          </>
        )}
      </div>
      <div className={`product-detail__cover`}>
        <Img src={`/img/products/${coverPhoto}`} />
      </div>
    </div>
  );
};

export default ProductDetail;

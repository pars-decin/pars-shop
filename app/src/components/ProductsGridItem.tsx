import React from 'react';

import { ShopItem } from '../../types';
import strings from '../../helpers/strings';
import Img from '../components/Img';
import Button from '../components/Button';
import { DataProvider } from '../hocs/dataContext';
import { LocationProvider } from '../hocs/withLocation';

const ProductsGridItem: React.FC<Partial<ShopItem>> = ({
  geometryImg,
  description,
  name,
  shopItemId,
}) => {
  const { history, location } = React.useContext(LocationProvider);

  return (
    <div className={`products-grid-item`}>
      <div className={`products-grid-item__intro`}>
        <Img src={`/img/products/${geometryImg}`} />
      </div>
      <div className={`products-grid-item__content`}>
        <h2>{name}</h2>
        <p>{description}</p>
        <Button
          className={`btn--secondary`}
          handleClick={() =>
            history.push(`/product/${shopItemId}${location.search}`)
          }
        >
          {strings.detail}
        </Button>
      </div>
    </div>
  );
};

export default ProductsGridItem;

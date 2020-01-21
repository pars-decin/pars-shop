import React from 'react';
import { motion } from 'framer-motion';

import { ShopItem } from 'src/types';
import Img from '../components/Img';
import Button from '../components/Button';
import { DataProvider } from '../hocs/dataContext';
import { LocationProvider } from '../hocs/withLocation';

interface Props {
  name: ShopItem['name'];
  perex: ShopItem['perex'];
  productImage: ShopItem['productImage'];
  uid: ShopItem['uid'];
}

const ProductsGridItem: React.FC<Props> = ({
  name,
  perex,
  productImage,
  uid,
}) => {
  const { staticData } = React.useContext(DataProvider);
  const detail = staticData.btnDetail;
  const { history } = React.useContext(LocationProvider);

  const transition = {
    duration: 0.3,
  };

  return (
    <motion.div
      className={`products-grid-item`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition }}
      exit={{ opacity: 0, transition }}
      positionTransition={{ type: 'spring', mass: 0.25, stiffness: 100 }}>
      <div className={`products-grid-item__intro`}>
        <Img src={`/img/products/${productImage}`} />
      </div>
      <div className={`products-grid-item__content`}>
        <h2>{name}</h2>
        <p>{perex}</p>
        <Button
          className={`btn--primary`}
          handleClick={() => history.push(`/product-detail/${uid}`)}>
          {detail}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductsGridItem;

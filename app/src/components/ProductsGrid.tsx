import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ProductsGridItem from './ProductsGridItem';

import { useSelector } from '../store/reducer';

import { ShopItem } from '../types';

interface Props {
  products: Array<ShopItem>;
}

const Products: React.FC<Props> = ({ products }) => {
  const [filteredProducts, filterProducts] = React.useState(products);
  const activeCategories = useSelector(state => state.activeCategories);
  const lastCategory = activeCategories[activeCategories.length - 1];

  React.useEffect(() => {
    if (lastCategory === 'all') {
      filterProducts(products);
    } else {
      filterProducts(
        products.filter(({ categories }) => activeCategories.equals(categories))
      );
    }
  }, [activeCategories]);

  return (
    <div className={`products-grid`}>
      <AnimatePresence>
        {filteredProducts.map(({ uid, name, perex, productImage }) => (
          <ProductsGridItem
            key={uid}
            uid={uid}
            name={name}
            perex={perex}
            productImage={productImage}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Products;

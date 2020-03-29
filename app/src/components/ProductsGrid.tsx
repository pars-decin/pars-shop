import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import shortHash from 'short-hash';

import ProductsGridItem from './ProductsGridItem';
import Button from './Button';

import { useSelector } from '../store/reducer';

import { ShopItem } from '../../types';

interface Props {
  shopItems: Array<ShopItem>;
}

const Products: React.FC<Props> = ({ shopItems }) => {
  const initialItemsIndex = 1;
  const [filteredShopItems, filterShopItems] = React.useState([]);
  const [itemsIndex, setItemsIndex] = React.useState(initialItemsIndex);
  const activeCategory = useSelector(state => state.activeCategories);

  React.useEffect(() => {
    filterShopItems(
      shopItems.filter(shopItem => {
        if (new RegExp(shortHash('Všechno'), 'i').test(activeCategory)) {
          const parentCategoryHash = activeCategory.split(
            shortHash('Všechno')
          )[0];

          return shopItem.inCategories.find(category =>
            new RegExp(parentCategoryHash, 'i').test(category)
          );
        } else {
          return shopItem.inCategories.includes(activeCategory);
        }
      })
    );
    setItemsIndex(initialItemsIndex);
  }, [activeCategory]);

  return (
    <AnimatePresence key={activeCategory}>
      <motion.div
        className={`products-grid`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredShopItems
          .slice(0, itemsIndex * 6)
          .map(({ shopItemId, name, coverPhoto, description }) => (
            <ProductsGridItem
              key={shopItemId}
              shopItemId={shopItemId}
              name={name}
              description={description}
              coverPhoto={coverPhoto}
            />
          ))}
        {itemsIndex * 6 < filteredShopItems.length && (
          <div className={`products-grid__load-more`}>
            <Button
              className={`btn--primary`}
              handleClick={() => setItemsIndex(x => x + initialItemsIndex)}
            >
              Zobrazit další
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Products;

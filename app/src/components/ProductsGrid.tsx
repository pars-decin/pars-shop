import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ProductsGridItem from './ProductsGridItem';
import Button from './Button';

import { useSelector } from '../store/reducer';

import { ShopItem } from '../../types';

interface Props {
  shopItems: Array<ShopItem>;
}

const Products: React.FC<Props> = ({ shopItems }) => {
  const initialItemsIndex = 1;
  const itemsPerPage = 24;
  const [filteredShopItems, filterShopItems] = React.useState([]);
  const [itemsIndex, setItemsIndex] = React.useState(initialItemsIndex);
  const activeCategory = useSelector((state) => state.activeCategories);
  const searchQuery = useSelector((state) => state.searchQuery);

  React.useEffect(() => {
    filterShopItems(
      shopItems.filter((shopItem) =>
        shopItem.inCategories.find((category) =>
          new RegExp(activeCategory, 'i').test(category)
        )
      )
    );
    setItemsIndex(initialItemsIndex);
  }, [activeCategory]);

  React.useEffect(() => {
    const searchRegex = new RegExp(searchQuery, 'gi');
    const test = (string) => searchRegex.test(string);

    filterShopItems(
      shopItems.filter(({ name, description, specification, inCategories }) => {
        return test(name) || test(description) || test(specification);
      })
    );
  }, [searchQuery]);

  if (filteredShopItems.length === 0) {
    return (
      <div className={`products-grid__empty-list`}>
        <h2>
          Nenašli jsme žádné položky obsahující: <span>{searchQuery}</span>
        </h2>
      </div>
    );
  }

  return (
    <AnimatePresence key={activeCategory}>
      <motion.div
        className={`products-grid`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredShopItems
          .slice(0, itemsIndex * itemsPerPage)
          .map(({ shopItemId, name, geometryImg, description }) => (
            <ProductsGridItem
              key={shopItemId}
              shopItemId={shopItemId}
              name={name}
              description={description}
              geometryImg={geometryImg}
            />
          ))}
        {itemsIndex * itemsPerPage < filteredShopItems.length && (
          <div className={`products-grid__load-more`}>
            <Button
              className={`btn--primary`}
              handleClick={() => setItemsIndex((x) => x + initialItemsIndex)}
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

// deps
import React from 'react';

// components
import Sidebar from '../components/Sidebar';
import ProductsGrid from '../components/ProductsGrid';
import View from '../components/View';
import ProductsCover from '../components/ProductsCover';
import ProductsLabel from '../components/ProductsLabel';
import Services from '../components/Services';

import { DataProvider } from '../hocs/dataContext';
import { useSelector } from '../store/reducer';

// hocs
import { withLocation } from '../hocs/withLocation';
import { CategoriesTree, Category } from '../../types';

interface Props {}

const Products: React.FC<Props> = () => {
  const { activeCategories, searchQuery } = useSelector((state) => state);
  const { shopItems, categoriesTree } = React.useContext(DataProvider);
  const [currentCategory, setCurrentCategory] = React.useState<
    CategoriesTree
  >();

  const productsRef = React.useRef(null);

  let output: CategoriesTree;
  const findCurrentCategory = (
    categories: Array<CategoriesTree>,
    activeCategory: string
  ): CategoriesTree => {
    if (!output) {
      for (const category of categories) {
        if (category.id === activeCategory) {
          output = category;
        } else {
          findCurrentCategory(category.list, activeCategory);
        }
      }
    }
    return output;
  };

  React.useEffect(() => {
    setCurrentCategory(findCurrentCategory(categoriesTree, activeCategories));
  }, [activeCategories]);

  return (
    <>
      <View className={`products-view with-sidebar`}>
        <Sidebar scrollToRef={productsRef} />
        <div ref={productsRef} className={`products`}>
          {currentCategory?.coverImg && (
            <ProductsCover src={currentCategory?.coverImg} />
          )}
          {currentCategory?.name && (
            <ProductsLabel label={currentCategory?.name} />
          )}
          <ProductsGrid shopItems={shopItems} />
        </div>
      </View>
      <Services />
    </>
  );
};

export default withLocation(Products);

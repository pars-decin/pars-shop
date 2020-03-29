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

const Products: React.FC<Props> = () => {
  const activeCategories = useSelector(state => state.activeCategories);
  const { shopItems, categoriesTree } = React.useContext(DataProvider);
  // FIX ME: first run is undefined

  const currentCategory = findCurrentCategory(categoriesTree, activeCategories);
  return (
    <>
      <View className={`products-view with-sidebar`}>
        <Sidebar />
        <div className={`products`}>
          <ProductsCover src={currentCategory?.coverImg} />
          <ProductsLabel label={currentCategory?.name} />
          <ProductsGrid shopItems={shopItems} />
        </div>
      </View>
      <Services />
    </>
  );
};

export default withLocation(Products);

// deps
import React from 'react';

// components
import Sidebar from '../components/Sidebar';
import ProductsGrid from '../components/ProductsGrid';
import View from '../components/View';

import { DataProvider } from '../hocs/dataContext';

// hocs
import { withLocation } from '../hocs/withLocation';

interface Props {}

const Products: React.FC<Props> = () => {
  const { shopItems } = React.useContext(DataProvider);
  return (
    <View className={`products-view`}>
      <Sidebar />
      <ProductsGrid products={shopItems} />
    </View>
  );
};

export default withLocation(Products);

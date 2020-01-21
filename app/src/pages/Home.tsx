import React from 'react';

import Sidebar from '../components/Sidebar';
import ProductsGrid from '../components/ProductsGrid';
import View from '../components/View';

import { DataProvider } from '../hocs/dataContext';

import { withLocation } from '../hocs/withLocation';

interface Props {}

const Home: React.FC<Props> = () => {
  const { shopItems } = React.useContext(DataProvider);
  return (
    <View className={`home-view`}>
      <Sidebar />
      <ProductsGrid products={shopItems} />
    </View>
  );
};

export default withLocation(Home);

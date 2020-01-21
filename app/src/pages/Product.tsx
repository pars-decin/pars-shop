import React from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import View from '../components/View';
import ProductDetail from '../components/ProductDetail';

import withDataProvider from '../hocs/dataContext';

interface Props {}

const Product: React.FC<Props> = () => {
  const { uid } = useParams();
  return (
    <View className={`product-detail-view`}>
      <Sidebar />
      <ProductDetail uid={uid} />
    </View>
  );
};

export default withDataProvider(Product);

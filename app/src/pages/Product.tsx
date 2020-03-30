import React from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import View from '../components/View';
import ProductDetail from '../components/ProductDetail';
import Services from '../components/Services';

import withDataProvider from '../hocs/dataContext';
import { withLocation } from '../hocs/withLocation';

interface Props {}

const Product: React.FC<Props> = () => {
  const { uid } = useParams();
  return (
    <>
      <View className={`product-detail-view with-sidebar`}>
        <Sidebar />
        <ProductDetail uid={uid} />
      </View>
      <Services />
    </>
  );
};

export default withLocation(Product);

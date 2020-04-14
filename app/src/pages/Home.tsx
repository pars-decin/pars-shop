import React from 'react';
import shortHash from 'short-hash';

import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import View from '../components/View';
import Img from '../components/Img';

import consts from '../../helpers/strings';

import { DataProvider } from '../hocs/dataContext';

import { withLocation, LocationProvider } from '../hocs/withLocation';

interface Props {}

const Home: React.FC<Props> = () => {
  const { categoriesTree } = React.useContext(DataProvider);
  const { history } = React.useContext(LocationProvider);

  return (
    <View className={`home-view with-sidebar`}>
      <Sidebar />
      <div className={`home-view__hero`}>
        {categoriesTree.map(({ name, id }, i) => (
          <div
            key={id}
            onClick={() => history.push(`/products?=${id}`)}
            className={`home-view__hero__category`}
          >
            <h1>{name}</h1>
            <Button
              className={`btn--primary`}
              handleClick={() => history.push(`/products?c=${id}`)}
            >
              {consts.detail}
            </Button>
            <div className={`home-view__hero__category__img-wrap`}>
              <Img src={`/img/others/homeHero${i}.jpg`} />
            </div>
          </div>
        ))}
      </div>
    </View>
  );
};

export default withLocation(Home);

import React from 'react';
import shortHash from 'short-hash';

import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import View from '../components/View';

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
            className={`home-view__hero__main-category ${
              i === 1 ? `home-view__hero__main-category--right` : ``
            }`}
          >
            {/* <h3>Produkty podle materiálu</h3> */}
            <h1>{name}</h1>
            <Button
              className={`btn--primary`}
              handleClick={() => history.push(`/products?c=${id}`)}
            >
              {consts.detail}
            </Button>
          </div>
        ))}
      </div>
    </View>
  );
};

export default withLocation(Home);

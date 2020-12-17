import React from 'react';
import Sidebar from '../components/Sidebar';
import View from '../components/View';
import { DataProvider } from '../hocs/dataContext';
import { LocationProvider, withLocation } from '../hocs/withLocation';
import { ShopItem } from '../../types';
import ProductsGrid from '../components/ProductsGrid';
import Link from '../components/Link';

interface Props {}

function findShopItemInCategory(inCategories, category) {
  const regex = new RegExp(`${category}`);
  return inCategories.find((inCategory) => regex.test(inCategory));
}

function getShopItemsByCategory({ shopItems, category }) {
  let output = [];

  for (const shopItem of shopItems) {
    const isShopItemInCategory = findShopItemInCategory(
      shopItem.inCategories,
      category
    );
    if (isShopItemInCategory) {
      output = [...output, shopItem];
    }
    if (output.length === 3) return output;
  }
}

const Home: React.FC<Props> = () => {
  const { shopItems, categoriesTree } = React.useContext(DataProvider);
  const { history, location } = React.useContext(LocationProvider);

  return (
    <View className={`home-view with-sidebar`}>
      <Sidebar />
      <div className={`home-view__hero`}>
        {categoriesTree.categoriesByProffesion.map((category) => {
          const featuredShopItems = getShopItemsByCategory({
            shopItems,
            category: category.id,
          });

          return (
            <div className={`home-view__hero__featured`} key={category.id}>
              <div className={`home-view__hero__featured__header`}>
                <h2>{category.name}</h2>
                <span
                  className={`link`}
                  onClick={() => history.push(`/products?c=${category.id}`)}
                >{`Zobrazit vše`}</span>
              </div>
              <ProductsGrid shopItems={featuredShopItems} />
            </div>
          );
        })}
      </div>
    </View>
  );
};

export default withLocation(Home);

import staticData from './static';
import shopItems from './shopItems';
import categories from './categories';
const products = require('./products').default;

export default {
  staticData: staticData,
  shopItems: shopItems.map(
    ({ productIds, categories, imageNames, ...rest }) => ({
      productIds: productIds.split('\n'),
      categories: categories.split('\n'),
      imageNames: imageNames.split('\n'),
      ...rest,
    })
  ),
  products: products,
  categories: categories,
};

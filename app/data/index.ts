import rawCategories from './categories';
import rawShopItems from './shopItems';
import shopItemsVariants from './shopItemsVariants';

import convertLevelsToArray from '../helpers/convertLevelsToArray';
import makeTreeFromCategories from '../helpers/makeTreeFromCategories';
import addCategoriesToShopItems from '../helpers/addCategoriesToShopItems';

// data transformations

const categories = convertLevelsToArray(rawCategories);
const categoriesTree = makeTreeFromCategories(categories);
const shopItems = addCategoriesToShopItems(rawShopItems, categories);

export default {
  categoriesTree,
  categories,
  shopItems,
  shopItemsVariants,
};

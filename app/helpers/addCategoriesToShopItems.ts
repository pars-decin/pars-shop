import { Category, RawShopItem, ShopItem } from '../types';
import mergeHashedLevels from './mergeHashedLevels';

export default function addCategoriesToShopItems(
  shopItems: Array<RawShopItem>,
  categoriesWithLevelsInArray: Array<Category>
): Array<ShopItem> {
  let categories = [];

  function addCategoriesToShopItem(shopItem) {
    const { shopItemId } = shopItem;

    const matchedCategories = categoriesWithLevelsInArray.filter(
      category => category.shopItemId === shopItemId
    );

    const levels = matchedCategories.map(({ levels }) =>
      mergeHashedLevels(levels)
    );

    return {
      ...shopItem,
      inCategories: levels,
      imageNames: shopItem.imageNames.split('\n'),
    };
  }

  for (const shopItem of shopItems) {
    categories = [...categories, addCategoriesToShopItem(shopItem)];
  }
  return categories;
}

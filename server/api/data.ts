import addCategoriesToShopItems from '../helpers/addCategoriesToShopItems';
import database from '../config';
import convertLevelsToArray from '../helpers/convertLevelsToArray';
import makeTreeFromCategories from '../helpers/makeTreeFromCategories';
import allowCors from '../helpers/allowCors';

const data = async (req, res) => {
  const databaseRef = await database.ref().once('value');

  const db = databaseRef.val();
  const categories = convertLevelsToArray(db.categories.data);

  const categoriesByMaterial = makeTreeFromCategories(
    categories,
    1,
    `byMaterial`
  );
  const categoriesByProffesion = makeTreeFromCategories(
    categories,
    0,
    `byProffesion`
  );

  const categoriesTree = { categoriesByMaterial, categoriesByProffesion };

  const shopItems = addCategoriesToShopItems(db.shopItems.data, categories);
  const shopItemsVariants = db.shopItemsVariants.data;

  res.json({
    categories,
    categoriesTree,
    shopItems,
    shopItemsVariants,
  });
};

module.exports = allowCors(data);

import shortHash from 'short-hash';
import mergeHashedLevels from './mergeHashedLevels';
import { Category, CategoriesTree } from '../types';

export default function makeTreeFromCategories(
  categoriesWithLevelsInArray: Array<Category>,
  startIndex: number,
  prefix: string
): Array<CategoriesTree> {
  let dump = {};
  let tree = [];

  function makeTree(category, level, parentId) {
    let categoryId = parentId + shortHash(category.levels[0]);

    if (!dump[categoryId]) {
      dump[categoryId] = {
        name: category.levels[0],
        id: categoryId,
        coverImg: category.coverImg,
        list: [],
      };
    }

    if (
      parentId.length === 0 &&
      // @ts-ignore
      tree.findIndex((x) => x.id === categoryId) < 0
    ) {
      // @ts-ignore
      tree.push(dump[categoryId]);
    } else if (
      parentId.length > 0 &&
      dump[parentId].list.findIndex((x) => x.id === categoryId) === -1
    ) {
      dump[parentId].list.push(dump[categoryId]);
    }

    if (category.levels.length > 1) {
      makeTree(
        {
          ...category,
          levels: category.levels.slice(1),
        },
        level + 1,
        categoryId
      );
    }
  }

  for (const categoryWithLevelsInArray of categoriesWithLevelsInArray) {
    const slicedLevels = categoryWithLevelsInArray.levels.slice(startIndex);

    makeTree({ ...categoryWithLevelsInArray, levels: slicedLevels }, 0, ``);
  }

  return tree;
}

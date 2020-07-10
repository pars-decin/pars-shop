import { RawCategory, Category } from '../types';

export default function convertLevelsToArray(
  rawCategories: Array<RawCategory>
): Array<Category> {
  let categoriesWithLevelsInArray = [];
  function processRawCategory(rawCategory: RawCategory) {
    let rest = {};
    let levelsBuffer = [];

    for (const rawCategoryKey in rawCategory) {
      if (/level\d/.test(rawCategoryKey)) {
        levelsBuffer = [...levelsBuffer, rawCategory[rawCategoryKey]];
      } else {
        rest = {
          [rawCategoryKey]: rawCategory[rawCategoryKey],
          ...rest,
        };
      }
    }

    return { levels: levelsBuffer, ...rest };
  }

  for (const rawCategory of rawCategories) {
    categoriesWithLevelsInArray = [
      ...categoriesWithLevelsInArray,
      processRawCategory(rawCategory),
    ];
  }

  return categoriesWithLevelsInArray;
}

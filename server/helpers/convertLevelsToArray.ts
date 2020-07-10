import { RawCategory, Category } from '../../app/types';

export default function convertLevelsToArray(
  rawCategories: Array<RawCategory>
): Array<Category> {
  let categoriesWithLevelsInArray = [];
  function processRawCategory(rawCategory: RawCategory) {
    let rest = {};
    let levelsBuffer = [];

    for (const rawCategoryKey in rawCategory) {
      if (/level\d/.test(rawCategoryKey)) {
        // @ts-ignore
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
    // @ts-ignore
    categoriesWithLevelsInArray = [
      ...categoriesWithLevelsInArray,
      processRawCategory(rawCategory),
    ];
  }

  return categoriesWithLevelsInArray;
}

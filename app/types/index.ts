export type RawCategory = {
  level0: string;
  level1?: string | undefined;
  level2?: string | undefined;
  level3?: string | undefined;
  coverImg: string;
  shopItemId: string;
};

export type Category = {
  levels: Array<string>;
  coverImg: string;
  shopItemId: string;
};

export type ShopItem = {
  inCategories: Array<string>;
  shopItemId: string;
  name: string;
  description: string;
  specification: string;
  coverPhoto: string;
  imageNames: Array<string>;
};

export type RawShopItem = {
  shopItemId: string;
  name: string;
  description: string;
  specification: string;
  coverPhoto: string;
  imageNames: string;
};

// FIX ME: for dev purposes only
// change all any to string
export type ShopItemVariant = {
  shopItemId: string;
  varioId?: any;
  dimensions?: any;
  material?: any;
  unit?: any;
  coef?: any;
  coefUnit?: any;
};

export type CategoriesTree = {
  coverImg: string;
  id: string;
  name: string;
  list: Array<CategoriesTree>;
};

export type Context = {
  categoriesTree: Array<CategoriesTree>;
  categories: Array<Category>;
  shopItems: Array<ShopItem>;
  shopItemsVariants: Array<ShopItemVariant>;
};

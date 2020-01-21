export type ShopItem = {
  uid: string;
  productIds: string[];
  categories: string[];
  name: string;
  perex: string;
  specification: string;
  productImage: string;
  imageNames: string[];
};

export type Category = {
  id: string;
  name: string;
  list: Category[] | [];
};

export type Product = {
  productId: string;
  name: string;
  dimensions: string;
  dimensionsItem: string;
  material: string;
  materialItem: string;
  catalogueNo: string;
  conversion: string;
  norm: string;
};

export type Context = {
  products: Array<Product>;
  shopItems: Array<ShopItem>;
  categories: Array<Category>;
  staticData: any;
};

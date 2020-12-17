import { ShopItemVariant } from '../types';

export function getShopItemByVarioId(
  shopItemVariants: Array<ShopItemVariant>,
  varioId: string
) {
  return shopItemVariants.find((variant) => variant.varioId === varioId);
}

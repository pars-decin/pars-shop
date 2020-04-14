import React, { ReactElement } from 'react';
import Link from './Link';
import CartItem from './CartItem';
import { DataProvider } from '../hocs/dataContext';
interface Props {
  varioIds: Array<string>;
  removeItem: (x) => void;
}

function Cart({ varioIds, removeItem }: Props): ReactElement {
  const { shopItems, shopItemsVariants } = React.useContext(DataProvider);
  return (
    <div className={`cart`}>
      <div className={`cart__header`}>
        <div className={`cart__header__item`}>Produkty</div>
      </div>
      {varioIds.map((varioId, i) => {
        const { dimensions, shopItemId, unit } = shopItemsVariants.find(
          (variant) => variant.varioId === varioId
        );
        const { name } = shopItems.find(
          (shopItem) => shopItem.shopItemId === shopItemId
        );
        return (
          <CartItem
            header={name}
            key={varioId}
            index={i}
            varioId={varioId}
            perex={dimensions}
            unit={unit}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
}

export default Cart;

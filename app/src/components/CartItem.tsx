import React, { ReactElement } from 'react';
import TextInput, { Props as TextInputProps } from './TextInput';
import Badge from './Badge';

interface Props {
  header: string;
  perex: string;
  index: number;
  shopItemId: string;
  textInputs: Array<TextInputProps>;
  removeItem: (shopItemId: string) => void;
}

const CartItem: React.FC<Props> = ({
  header,
  perex,
  textInputs,
  index,
  removeItem,
  shopItemId,
}) => {
  return (
    <div className={`cart-item`}>
      <div className={`cart-item__col cart-item__col__name`}>
        {index === 0 && <div className={`cart-item__col__header`}>Produkt</div>}
        <div className={`cart-item__col__name__content`}>
          <h3>{header}</h3>
          <p>{perex}</p>
        </div>
      </div>
      {textInputs.map(textInput => (
        <div
          key={textInput.id}
          className={`cart-item__col cart-item__col__input`}
        >
          {index === 0 && (
            <div className={`cart-item__col__header`}>
              {textInput.label}
              {textInput.badgeMessage && (
                <Badge type={`info`}>{textInput.badgeMessage}</Badge>
              )}
            </div>
          )}
          <div className={`cart-item__col__input__content`}>
            <TextInput {...textInput} />
          </div>
        </div>
      ))}
      <div className={`cart-item__col cart-item__col__remove`}>
        {index === 0 && <div className={`cart-item__col__header`}>Odebrat</div>}
        <div
          className={`cart-item__col__remove__content`}
          onClick={() => removeItem(shopItemId)}
        />
      </div>
    </div>
  );
};

export default CartItem;

import React, { ReactElement } from 'react';
import TextInput, { Props as TextInputProps } from './TextInput';
import Badge from './Badge';
import Img from './Img';
import { Field, useFormik, useField } from 'formik';
import strings from '../../helpers/strings';
import TextInputCounter from './TextInputCounter';

interface Props {
  header: string;
  perex: string;
  index: number;
  varioId: string;
  unit: string;
  removeItem: (varioId: string) => void;
}

const CartItem: React.FC<Props> = ({
  header,
  perex,
  index,
  removeItem,
  varioId,
  unit,
}) => {
  const [field, meta, helpers] = useField(`items.${varioId}`);
  return (
    <div className={`cart-item`}>
      <div className={`cart-item__col cart-item__col__name`}>
        <div className={`cart-item__col__name__content`}>
          <span
            className={`cart-item__col__name__content__remove`}
            onClick={() => removeItem(varioId)}
          >
            <Img src={`/icons/removeProductFromCart.svg`} />
          </span>
          <h3>{header}</h3>
          <p>{perex}</p>
        </div>
      </div>
      {unit !== `ks` && (
        <>
          <div className='cart-item__col cart-item__col__input'>
            <Field
              name={`items.${varioId}.dimensions`}
              label={`${strings.length} [${unit}]`}
              as={TextInput}
            />
          </div>
          <TextInputCounter
            handleValue={(inc) => () => {
              helpers.setValue({
                ...meta.value,
                dimensions:
                  meta.value.dimensions + inc < 0
                    ? 0
                    : meta.value.dimensions + inc,
              });
              helpers.setTouched(true);
            }}
            inc={1}
          />
        </>
      )}
      <div className='cart-item__col cart-item__col__input'>
        <Field
          name={`items.${varioId}.no`}
          label={strings.itemsNo}
          as={TextInput}
        />
      </div>
      <TextInputCounter
        handleValue={(inc) => () => {
          helpers.setValue({
            ...meta.value,
            no: meta.value.no + inc < 0 ? 0 : meta.value.no + inc,
          });
          helpers.setTouched(true);
        }}
        inc={1}
      />
    </div>
  );
};

export default CartItem;

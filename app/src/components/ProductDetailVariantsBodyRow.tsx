import React from 'react';
import strings from '../../helpers/strings';

import { useCookies } from 'react-cookie';

import ProductDetailVariantsBodyRowItem from './ProductDetailVariantsBodyRowItem';
import ProductDetailVariantsBodyRowDropdown from './ProductDetailVariantsBodyRowDropdown';
import Button from './Button';

interface Props {
  rowData: Array<string>;
  labels: Array<string>;
  varioId: string;
}

const ProductDetailVariantsBodyRow: React.FC<Props> = ({
  rowData,
  labels,
  varioId,
}) => {
  const [showDropdown, toggleDropDown] = React.useState(false);
  const [cookies, setCookie] = useCookies();
  return (
    <div
      className={`variants__body__row ${showDropdown ? `active` : ``}`}
      onClick={() =>
        toggleDropDown(prevState => window.innerWidth < 600 && !prevState)
      }
    >
      {rowData.map((text, i) => (
        <ProductDetailVariantsBodyRowItem text={text} key={i} />
      ))}
      {!cookies?.parsCart?.includes(varioId) ? (
        <Button
          className={`btn--invisible`}
          handleClick={e => {
            // do not trigger dropdown
            e.stopPropagation();
            const parsCookies = cookies?.parsCart || [];

            if (!parsCookies.includes(varioId)) {
              setCookie('parsCart', [...parsCookies, varioId]);
              // @ts-ignore
              window.updateDemandBadge();
            }
          }}
        >
          {strings.order}
        </Button>
      ) : (
        <Button
          className={`btn--invisible btn--disabled`}
          handleClick={e => {
            // do not trigger dropdown
            e.stopPropagation();
            setCookie(
              'parsCart',
              cookies.parsCart.filter(x => x !== varioId)
            );
            // @ts-ignore
            window.updateDemandBadge();
          }}
        >{` `}</Button>
      )}
      <ProductDetailVariantsBodyRowDropdown
        labels={labels}
        rowData={rowData}
        showDropdown={showDropdown}
      />
    </div>
  );
};

export default ProductDetailVariantsBodyRow;

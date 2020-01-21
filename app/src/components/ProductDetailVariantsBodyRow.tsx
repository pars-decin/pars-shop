import React from 'react';

import ProductDetailVariantsBodyRowItem from './ProductDetailVariantsBodyRowItem';
import Button from './Button';

interface Props {
  rowData: Array<string>;
  labels: Array<string>;
}

const ProductDetailVariantsBodyRow: React.FC<Props> = ({ rowData, labels }) => {
  const [showDropdown, toggleDropDown] = React.useState(false);
  return (
    <div
      className={`variants__body__row ${showDropdown ? `show` : `hide`}`}
      onClick={() => toggleDropDown(prevState => !prevState)}>
      {rowData.map((text, i) => (
        <ProductDetailVariantsBodyRowItem
          text={text}
          key={text}
          // first item doesn't have label
          rowsKeys={i === 0 ? null : labels[i]}
        />
      ))}
      {/* > TODO: extract text into json */}
      <Button className={`btn--invisible`}>POPTAT</Button>
    </div>
  );
};

export default ProductDetailVariantsBodyRow;

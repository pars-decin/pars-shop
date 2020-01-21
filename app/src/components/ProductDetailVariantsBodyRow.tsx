import React from 'react';

import ProductDetailVariantsBodyRowItem from './ProductDetailVariantsBodyRowItem';
import ProductDetailVariantsBodyRowDropdown from './ProductDetailVariantsBodyRowDropdown';
import Button from './Button';

interface Props {
  rowData: Array<string>;
  labels: Array<string>;
}

const ProductDetailVariantsBodyRow: React.FC<Props> = ({ rowData, labels }) => {
  const [showDropdown, toggleDropDown] = React.useState(false);
  return (
    <div
      className={`variants__body__row`}
      onClick={() => toggleDropDown(prevState => !prevState)}>
      {rowData.map((text, i) => (
        <ProductDetailVariantsBodyRowItem text={text} key={text} />
      ))}
      {/* TODO: extract text into json */}
      <Button className={`btn--invisible`}>POPTAT</Button>
      <ProductDetailVariantsBodyRowDropdown
        labels={labels}
        rowData={rowData}
        showDropdown={showDropdown}
      />
    </div>
  );
};

export default ProductDetailVariantsBodyRow;

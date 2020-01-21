import React from 'react';

interface Props {
  text: string;
  rowsKeys: string | null;
}

const ProductDetailVariantsBodyRowItem: React.FC<Props> = ({
  text,
  rowsKeys,
}) => {
  return (
    <div className={`variants__body__row__item`}>
      {/* eq. Materiál: S355J2 */}
      {rowsKeys && (
        <div className={`variants__body__row__item__key`}>
          {`${rowsKeys}:\u00a0`}
        </div>
      )}
      {text}
    </div>
  );
};

export default ProductDetailVariantsBodyRowItem;

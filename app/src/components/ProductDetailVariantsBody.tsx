import React from 'react';

import ProductDetailVariantsBodyRow from './ProductDetailVariantsBodyRow';
import Scrollbar from './Scrollbar';

interface Props {
  rowsData: Array<Array<string>>;
  labels: Array<string>;
  varioIds: Array<string>;
}

const ProductDetailVariantsBody: React.FC<Props> = ({
  rowsData,
  labels,
  varioIds,
}) => {
  const rowHeight = 47;
  const rowsCount = rowsData.length;
  return (
    <div className={`variants__body`}>
      <Scrollbar
        styles={{
          height:
            rowHeight * rowsCount >= 400
              ? (window.innerHeight / 15) * 5
              : rowHeight * rowsCount,
          minHeight: 300,
        }}
      >
        {rowsData.map((rowData, i) => (
          <ProductDetailVariantsBodyRow
            key={i}
            varioId={varioIds[i]}
            rowData={rowData}
            labels={labels}
          />
        ))}
      </Scrollbar>
    </div>
  );
};

export default ProductDetailVariantsBody;

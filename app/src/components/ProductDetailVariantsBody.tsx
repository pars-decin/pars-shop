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
  const content = rowsData.map((rowData, i) => (
    <ProductDetailVariantsBodyRow
      key={i}
      varioId={varioIds[i]}
      rowData={rowData}
      labels={labels}
    />
  ));
  return (
    <div className={`variants__body`}>
      {rowsCount >= 10 ? (
        <Scrollbar
          styles={{
            height: (window.innerHeight / 15) * 5,
            // minHeight: 300,
          }}
        >
          {content}
        </Scrollbar>
      ) : (
        content
      )}
    </div>
  );
};

export default ProductDetailVariantsBody;

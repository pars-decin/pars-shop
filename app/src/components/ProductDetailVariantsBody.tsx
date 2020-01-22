import React from 'react';

import ProductDetailVariantsBodyRow from './ProductDetailVariantsBodyRow';
import Scrollbar from './Scrollbar';

import { Product } from '../types';

interface Props {
  rowsData: Array<Array<string>>;
  labels: Array<string>;
}

const ProductDetailVariantsBody: React.FC<Props> = ({ rowsData, labels }) => {
  return (
    <div className={`variants__body`}>
      <Scrollbar
        styles={{ height: (window.innerHeight / 15) * 5, minHeight: 400 }}>
        {rowsData.map((rowData, i) => (
          <ProductDetailVariantsBodyRow
            key={i}
            rowData={rowData}
            labels={labels}
          />
        ))}
      </Scrollbar>
    </div>
  );
};

export default ProductDetailVariantsBody;

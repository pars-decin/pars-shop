import React from 'react';

import { DataProvider } from '../hocs/dataContext';
import { ShopItemVariant } from '../../types';
import strings from '../../helpers/strings';

import ProductDetailVariantsHead from './ProductDetailVariantsHead';
import ProductDetailVariantsBody from './ProductDetailVariantsBody';

interface Props {
  variantsId: string;
}

const makeTable = (variants: Array<ShopItemVariant>) => {
  return {
    head: [
      strings.dimension,
      strings.material,
      `${strings.weight} [${variants[0].coefUnit}]`,
    ],
    body: variants.map(({ dimensions, material, coef }) => [
      dimensions,
      material,
      coef,
    ]),
    varioIds: variants.map(({ varioId }) => varioId),
  };
};

const ProductVariants: React.FC<Props> = ({ variantsId }) => {
  const { shopItemsVariants } = React.useContext(DataProvider);

  const matchedVariants = shopItemsVariants.filter(
    ({ shopItemId }) => shopItemId === variantsId
  );

  const { head, body, varioIds } = makeTable(matchedVariants);

  return (
    <div className={`variants`}>
      <ProductDetailVariantsHead labels={head} />
      <ProductDetailVariantsBody
        labels={head}
        rowsData={body}
        varioIds={varioIds}
      />
    </div>
  );
};

export default ProductVariants;

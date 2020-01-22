import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  showDropdown: boolean;
  rowData: Array<string>;
  labels: Array<string>;
}

const transition = {
  stiffness: 100,
  mass: 0.2,
};

const variants = {
  show: {
    height: 'auto',
    opacity: 1,
    transition: { ...transition, when: 'beforeChildren', staggerChildren: 0.1 },
  },
  hide: {
    height: 0,
    opacity: 0,
    transition: {
      ...transition,
      when: 'afterChildren',
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
    transitionEnd: { display: 'none' },
  },
};

const ProductDetailVariantsBodyRowDropdown: React.FC<Props> = ({
  labels,
  rowData,
  showDropdown,
}) => {
  return (
    <motion.div
      className={`variants__body__row__dropdown`}
      animate={showDropdown ? `show` : `hide`}
      initial={false}
      variants={variants as any}>
      {rowData.map((item, i) => (
        <motion.p
          key={item}
          variants={{ show: { opacity: 1 }, hide: { opacity: 0 } }}>
          {labels[i]}: {item}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default ProductDetailVariantsBodyRowDropdown;

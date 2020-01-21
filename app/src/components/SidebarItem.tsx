import React from 'react';
import { motion } from 'framer-motion';

import Img from './Img';

interface Props {
  children: React.ReactNode;
  className?: String;
  id: string;
  isActive: Boolean;
  hasList: Boolean;
  handleClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const SidebarItem: React.FC<Props> = ({
  children,
  className = '',
  hasList = false,
  handleClick = () => null,
  isActive = false,
  id,
}) => {
  const transition = {
    // duration: 0.8,
    // ease: [0.04, 0.62, 0.23, 0.98],
    restSpeed: 2,
    restDelta: 2,
  };
  // console.log({ id, isActive });
  return (
    <motion.span
      id={id}
      className={`sidebar__item ${isActive ? `active` : ``} ${className}`}
      onClick={handleClick}
      variants={{
        collapsed: { x: -25, opacity: 0, ...transition },
        expanded: { x: 0, opacity: 1, ...transition },
      }}>
      {hasList && <Img src={`/icons/${isActive ? `minus` : `plus`}.svg`} />}
      {children}
    </motion.span>
  );
};

export default SidebarItem;

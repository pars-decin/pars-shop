import React from 'react';
import SidebarBlock from './SidebarBlock';
import { AnimatePresence } from 'framer-motion';

interface Props {
  list: Array<any>;
  level: number;
}

const SidebarList: React.FC<Props> = ({ list, level }) => {
  return (
    <React.Fragment>
      {list.map(({ id, name, list }, i) => (
        <SidebarBlock key={id} id={id} name={name} list={list} level={level} />
      ))}
    </React.Fragment>
  );
};

export default SidebarList;

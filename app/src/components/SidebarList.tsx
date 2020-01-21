import React from 'react';
import SidebarBlock from './SidebarBlock';
import { AnimatePresence } from 'framer-motion';

interface Props {
  list: Array<any>;
  level: number;
  url: Array<string>;
}

const SidebarList: React.FC<Props> = ({ list, level, url }) => {
  return (
    <React.Fragment>
      {list.map(({ id, name, list }, i) => (
        <SidebarBlock
          key={id}
          id={id}
          name={name}
          list={list}
          level={level}
          url={[...url, id]}
        />
      ))}
    </React.Fragment>
  );
};

export default SidebarList;

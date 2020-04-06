import React from 'react';
import shortHash from 'short-hash';
import SidebarBlock from './SidebarBlock';
import { AnimatePresence } from 'framer-motion';

interface Props {
  list: Array<any>;
  scrollToRef?: React.MutableRefObject<HTMLElement>;
  level: number;
}

const SidebarList: React.FC<Props> = ({ list, level, scrollToRef }) => {
  return (
    <React.Fragment>
      {list.map(({ id, name, list }) => (
        <SidebarBlock
          key={id}
          id={id}
          name={name}
          list={list}
          level={level}
          scrollToRef={scrollToRef}
        />
      ))}
    </React.Fragment>
  );
};

export default SidebarList;

import React from 'react';
import { AnimatePresence } from 'framer-motion';

import SidebarBlock from './SidebarBlock';

import { DataProvider } from '../hocs/dataContext';

const Sidebar: React.FC = () => {
  const { categories } = React.useContext(DataProvider);
  return (
    <div className={`sidebar`}>
      <AnimatePresence>
        {categories.map(({ id, name, list }) => (
          <SidebarBlock
            key={id}
            id={id}
            name={name}
            list={list}
            level={1}
            url={[id]}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;

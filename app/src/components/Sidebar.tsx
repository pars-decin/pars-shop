import React from 'react';
import { AnimatePresence } from 'framer-motion';

import SidebarBlock from './SidebarBlock';
import Img from './Img';

import { DataProvider } from '../hocs/dataContext';

const Sidebar: React.FC = () => {
  const { categoriesTree } = React.useContext(DataProvider);
  const [showSidebar, toggleSidebar] = React.useState(true);
  return (
    <div className={`sidebar`}>
      <div
        className={`sidebar__toggler ${showSidebar ? `show` : ``}`}
        onClick={() => toggleSidebar(prevState => !prevState)}
      >
        <Img
          src={`/icons/${showSidebar ? `categoriesClose` : `categories`}.svg`}
        />
        <h3>Kategorie</h3>
      </div>
      <AnimatePresence initial={false}>
        {(showSidebar || window.innerWidth > 900) &&
          categoriesTree.map(({ id, name, list }) => (
            <SidebarBlock key={id} id={id} name={name} list={list} level={1} />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;

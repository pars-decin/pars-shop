import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import scrollToElement from 'scroll-to-element';
import { useViewportDimensions } from '../hooks/useViewportDimensions';

import SidebarBlock from './SidebarBlock';
import Img from './Img';

import { DataProvider } from '../hocs/dataContext';

interface Props {
  scrollToRef?: React.MutableRefObject<HTMLDivElement>;
}

const Sidebar: React.FC<Props> = ({ scrollToRef }) => {
  const { categoriesTree } = React.useContext(DataProvider);
  const [showSidebar, toggleSidebar] = React.useState(false);
  const location = useLocation();
  const { width } = useViewportDimensions();
  const tabletPortaitAndLarger = width > 900;

  React.useEffect(() => {
    !tabletPortaitAndLarger && toggleSidebar(false);
  }, [location]);

  return (
    <div className={`sidebar`}>
      <div
        className={`sidebar__toggler ${showSidebar ? `show` : ``}`}
        onClick={() => {
          toggleSidebar((prevState) => !prevState);
        }}
      >
        <Img src={`/icons/categories.svg`} />
        <h3>Kategorie</h3>
      </div>
      <AnimatePresence initial={false}>
        {(showSidebar || tabletPortaitAndLarger) &&
          categoriesTree.map(({ id, name, list }) => (
            <SidebarBlock
              key={id}
              id={id}
              name={name}
              list={list}
              level={1}
              scrollToRef={scrollToRef}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;

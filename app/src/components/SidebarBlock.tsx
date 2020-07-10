import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from '../store/reducer';

import SidebarItem from './SidebarItem';
import SidebarList from './SidebarList';

import { LocationProvider } from '../hocs/withLocation';
import queryString from 'query-string';

const variants = {
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      restSpeed: 2,
      restDelta: 2,
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      when: 'afterChildren',
      restSpeed: 2,
      restDelta: 2,
    },
  },
};
interface Props {
  id: string;
  className?: String;
  level: number;
  name: String;
  list: Array<Object | any>;
  scrollToRef?: React.MutableRefObject<HTMLElement>;
}

const SidebarBlock: React.FC<Props> = ({
  id,
  name,
  className = '',
  list,
  level,
  scrollToRef,
}) => {
  const [{ isActive, expandList }, setStatus] = React.useState({
    isActive: false,
    expandList: false,
  });

  const { history } = React.useContext(LocationProvider);
  const activeCategories = useSelector((state) => state.activeCategories);
  const hasList = list.length !== 0;

  const handleClick = () => {
    const queryParams = queryString.stringify({ c: id });
    history.push(`/products?${queryParams}`);
  };

  React.useEffect(() => {
    // if active categories has changed, and there is a match with
    // active categories toggle active state
    // active state will both expand list and highlight current item
    if (activeCategories.includes(id)) {
      setStatus({
        isActive: true,
        expandList: hasList ? true : false,
      });
    } else {
      setStatus({ isActive: false, expandList: false });
    }
  }, [activeCategories]);

  return (
    <motion.div
      className={`sidebar__block ${`level${level}`} ${
        expandList ? `expanded` : `collapsed`
      } ${className}`}
      initial={'collapsed'}
      animate={'expanded'}
      exit={'collapsed'}
      variants={variants}
    >
      <SidebarItem
        id={id}
        className={`sidebar__block__header`}
        handleClick={handleClick}
        hasList={hasList}
        isActive={isActive}
      >
        {name}
      </SidebarItem>
      <AnimatePresence>
        {expandList && hasList && (
          <SidebarList
            key={id}
            list={list}
            level={level + 1}
            scrollToRef={scrollToRef}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SidebarBlock;

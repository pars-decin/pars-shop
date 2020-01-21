import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useDispatch } from 'react-redux';
import { useSelector } from '../store/reducer';

import SidebarItem from './SidebarItem';
import SidebarList from './SidebarList';

// import { setActiveCategories } from '../store/actions';
import { LocationProvider } from '../hocs/withLocation';
const queryString = require('query-string');

interface Props {
  id: string;
  className?: String;
  level: number;
  name: String;
  list: Array<Object | any>;
  url: Array<string>;
}

const SidebarBlock: React.FC<Props> = ({
  id,
  name,
  className = '',
  list,
  level,
  url,
}) => {
  const [{ isActive, expandList }, setStatus] = React.useState({
    isActive: false,
    expandList: false,
  });
  const { location, history } = React.useContext(LocationProvider);
  const activeCategories = useSelector(state => state.activeCategories);
  const hasList = list.length !== 0;

  const handleClick = () => {
    if (!hasList) {
      // change serach params with url props (array)
      const queryParams = queryString.stringify(
        { c: url },
        { arrayFormat: 'bracket' }
      );
      history.push(`${location.pathname}?${queryParams}`);
    } else {
      setStatus(({ expandList, isActive }) => ({
        isActive: !isActive,
        expandList: !expandList,
      }));
    }
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

  const transition = {};
  const variants = {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        ...transition,
        when: 'beforeChildren',
        restSpeed: 2,
        restDelta: 2,
      },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        ...transition,
        when: 'afterChildren',
        restSpeed: 2,
        restDelta: 2,
      },
    },
  };

  return (
    <motion.div
      className={`sidebar__block ${`level${level}`} ${
        expandList ? `expanded` : `collapsed`
      } ${className}`}
      initial={'collapsed'}
      animate={'expanded'}
      exit={'collapsed'}
      variants={variants}>
      <SidebarItem
        id={id}
        className={`sidebar__block__header`}
        handleClick={handleClick}
        hasList={hasList}
        isActive={isActive}>
        {name}
      </SidebarItem>
      <AnimatePresence>
        {expandList && hasList && (
          <SidebarList url={url} key={id} list={list} level={level + 1} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SidebarBlock;

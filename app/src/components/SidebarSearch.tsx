import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store/reducer';

import Img from './Img';

import consts from '../../helpers/strings';
import { setSearchQuery, setActiveCategories } from '../store/actions';
import { LocationProvider } from '../hocs/withLocation';

interface Props {}

function SidebarSearch({}: Props): ReactElement {
  const { history } = React.useContext(LocationProvider);
  const dispatch = useDispatch();
  const query = useSelector((x) => x.searchQuery);

  const handleChange = (e) => {
    setSearchQuery(dispatch)(e.target.value);
    if (query.length >= 2) {
      setActiveCategories(dispatch)('');
      history.push('/products');
    }
  };

  return (
    <div className={`sidebar-search`}>
      <div className='text-input'>
        <label htmlFor={`searchQuery`}>{consts.searchLabel}</label>
        <Img src={`/icons/search.svg`} alt='' />
        <input
          type={`text`}
          id={`searchQuery`}
          name={`searchQuery`}
          onChange={handleChange}
          value={query}
        />
      </div>
    </div>
  );
}

export default SidebarSearch;

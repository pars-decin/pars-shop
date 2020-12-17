import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store/reducer';

import Img from './Img';

import consts from '../../helpers/strings';
import { setSearchQuery, setActiveCategories } from '../store/actions';
import { LocationProvider } from '../hocs/withLocation';
import { Form, Formik, Field } from 'formik';
import TextInput from './TextInput';

interface Props {}

function SidebarSearch({}: Props): ReactElement {
  const { history } = React.useContext(LocationProvider);
  const dispatch = useDispatch();
  const query = useSelector((x) => x.searchQuery);

  const onSubmit = (values) => {
    setSearchQuery(dispatch)(values.search);
    history.push('/products');
    // if (query.length >= 2) {
    //   setActiveCategories(dispatch)('');
    // }
  };

  return (
    <div className={`sidebar-search`}>
      <Formik initialValues={{ search: '' }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Field name={`search`} as={TextInput} label={``} />
          </Form>
        )}
      </Formik>
    </div>
    // <form
    //   onSubmit={() => history.push('/products')}
    //   className={`sidebar-search`}
    // >
    //   <div className='text-input'>
    //     <label htmlFor={`searchQuery`}>{consts.searchLabel}</label>
    //     <Img src={`/icons/search.svg`} alt='' />
    //     <input
    //       type={`text`}
    //       id={`searchQuery`}
    //       name={`searchQuery`}
    //       onChange={handleChange}
    //       value={query}
    //     />
    //   </div>
    // </form>
  );
}

export default SidebarSearch;

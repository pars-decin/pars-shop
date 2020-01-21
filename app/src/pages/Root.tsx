// deps
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const queryString = require('query-string');

// page imports
import Product from './Product';
import Demand from './Demand';
import Home from './Home';
import Products from './Products';

// types
import { RouteComponentProps } from 'react-router-dom';

// others
import { setActiveCategories } from '../store/actions';
import withDataProvider from '../hocs/dataContext';

const Root: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  // this fires only when the window was refreshed or user came from direct link
  React.useEffect(() => {
    const activeCategories: { c: Array<string> } = queryString.parse(
      location.search,
      {
        arrayFormat: 'bracket',
      }
    );

    // if there is no query string, than don't dispatch anything
    // and keep the default state
    if ('c' in activeCategories) {
      setActiveCategories(dispatch)(activeCategories.c);
    }
  }, [location.search]);

  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route exact path={`/demand`} component={Demand} />
      <Route exact path={`/products`} component={Products} />
      <Route path={`/product-detail/:uid`} component={Product} />
    </Switch>
  );
};

export default withDataProvider(withRouter(Root));

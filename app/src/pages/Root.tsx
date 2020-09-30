// deps
import React from 'react';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
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
  const pathname = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    const activeCategory: { c: string } = queryString.parse(pathname.search);

    // if there is no query string, than don't dispatch anything
    // and keep the default state
    'c' in activeCategory && setActiveCategories(dispatch)(activeCategory.c);
  }, [pathname]);

  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route exact path={`/demand`} component={Demand} />
      <Route exact path={`/products`} component={Products} />
      <Route path={`/product/:uid`} component={Product} />
    </Switch>
  );
};

export default withDataProvider(withRouter(Root));

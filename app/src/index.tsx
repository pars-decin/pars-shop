import { hot } from 'react-hot-loader/root';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Root from './pages/Root';
import { reducer } from './store/reducer';

import './scss/index.scss';
import 'hamburgers/_sass/hamburgers/hamburgers.scss';
// import 'polyfill-object.fromentries';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

interface Props {}

const App: React.FC<Props> = hot(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Root />
      </HashRouter>
    </Provider>
  );
});

ReactDOM.render(<App />, document.getElementById('root'));

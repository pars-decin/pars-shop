import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import { SET_ACTIVE_CATEGORIES, SET_SEARCH_QUERY } from './actions';

const intialState = {
  activeCategories: '',
  searchQuery: '',
};

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORIES:
      return { ...state, activeCategories: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

type Reducer = ReturnType<typeof reducer>;

export const useSelector: TypedUseSelectorHook<Reducer> = useReduxSelector;

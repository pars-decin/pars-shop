import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import { SET_ACTIVE_CATEGORIES } from './actions';

const intialState = {
  activeCategories: [],
};

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORIES:
      return { ...state, activeCategories: action.payload };
    default:
      return state;
  }
};

type Reducer = ReturnType<typeof reducer>;

export const useSelector: TypedUseSelectorHook<Reducer> = useReduxSelector;

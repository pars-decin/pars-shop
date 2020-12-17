// types
import { Dispatch } from 'redux';

// action types
export const SET_ACTIVE_CATEGORIES = 'SET_ACTIVE_CATEGORIES';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setActiveCategories = (dispatch: Dispatch) => (url: string) => {
  dispatch({
    type: SET_ACTIVE_CATEGORIES,
    payload: url,
  });
};

export const setSearchQuery = (dispatch: Dispatch) => (query: string) => {
  dispatch({
    type: SET_SEARCH_QUERY,
    payload: query,
  });
};

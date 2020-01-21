// types
import { Dispatch } from 'redux';

// action types
export const SET_ACTIVE_CATEGORIES = 'SET_ACTIVE_CATEGORIES';

export const setActiveCategories = (dispatch: Dispatch) => (
  url: Array<string>
) => {
  dispatch({
    type: SET_ACTIVE_CATEGORIES,
    payload: url,
  });
};

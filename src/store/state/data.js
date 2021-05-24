import API from '../../utility/api';

const INITAL_STATE = {
  categories: [],
};

export const setCategories = () => async (dispatch) => {
  await API('categories?_limit=1000').then((response) => {
    dispatch({
      type: 'data/SET_CATEGORIES',
      payload: response.data,
    });
  }).catch((error) => console.log('getUserMe error', error))
};

export const reducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case 'data/SET_CATEGORIES': return { ...state, categories: payload };

    default:
      return state;
  }
};

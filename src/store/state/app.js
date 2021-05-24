import API, { setAuthorization } from '../../utility/api';

const INITAL_STATE = {
  title: process.env.REACT_APP_TITLE,

  loading: true,
};

export const startApp = () => {
  return async (dispatch) => {
    const jwt = window.localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY_JWT);

    if (jwt !== null) {
      setAuthorization(jwt);

      await API('users/me').then((response) => {
        dispatch({ type: 'auth/SET_USER', payload: response.data })
      }).catch((error) => console.log('getUserMe error', error))
    }

    dispatch({
      type: 'app/SET_APP_LOADING_STATUS',
      payload: false,
    });
  };
};

export const setTitle = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: 'app/SET_TITLE',
      payload,
    });
  };
};

export const reducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case 'app/SET_TITLE': return { ...state, title: payload };
    case 'app/SET_APP_LOADING_STATUS': return { ...state, loading: payload };

    default:
      return state;
  }
};

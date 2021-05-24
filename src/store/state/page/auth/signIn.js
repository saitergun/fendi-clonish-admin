import API, { setAuthorization } from '../../../../utility/api';
import appToaster from '../../../../utility/appToaster';

const INITAL_STATE = {
  identifier: 'saitergun',
  password: 'Sait123',
  signing: false,
};

export const setIdentifier = (payload) => async (dispatch) => dispatch({
  type: 'page/auth/signIn/SET_IDENTIFIER',
  payload,
});

export const setPassword = (payload) => async (dispatch) => dispatch({
  type: 'page/auth/signIn/SET_PASSWORD',
  payload,
});

export const setSigning = (payload) => async (dispatch) => dispatch({
  type: 'page/auth/signIn/SET_SIGNING',
  payload,
});

export const handleSignIn = (e) => {
  e?.preventDefault();

  return async (dispatch, getState) => {
    const state = getState()

    const { identifier, password } = state.page.auth.signIn;

    dispatch({ type: 'page/auth/signIn/SET_SIGNING', payload: true });

    setTimeout(() => {
      API.post('auth/local', { identifier, password }).then((response) => {
        if (response.data.user.role.type === 'god') {
          dispatch({ type: 'auth/SET_USER', payload: response.data.user })

          dispatch({ type: 'page/auth/signIn/SET_IDENTIFIER', payload: '' })
          dispatch({ type: 'page/auth/signIn/SET_PASSWORD', payload: '' })

          setAuthorization(response.data.jwt);
        } else {
          appToaster.show({
            message: 'An error occured',
            intent: 'danger',
          });
        }
      }).catch((error) => {
        if (error?.response) {
          appToaster.show({
            message: error.response?.data?.message?.[0]?.messages?.[0]?.message,
            intent: 'danger',
          });
        } else {
          appToaster.show({
            message: 'Unexpected error occured',
            intent: 'danger',
          });
        }
      }).finally(() => {
        dispatch({ type: 'page/auth/signIn/SET_SIGNING', payload: false });
      });
    }, 2000);
  };
};

export const reducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case 'page/auth/signIn/SET_IDENTIFIER': return { ...state, identifier: payload };
    case 'page/auth/signIn/SET_PASSWORD': return { ...state, password: payload };
    case 'page/auth/signIn/SET_SIGNING': return { ...state, signing: payload };

    default:
      return state;
  }
};

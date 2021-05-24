import API, { setAuthorization, removeAuthorization } from '../../utility/api';

const INITAL_STATE = {
  user: null,
};

export const signIn = ({ identifier, password }) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('auth/local', { identifier, password }).then((response) => {
        if (response.data.user.role.type === 'god') {
          dispatch({ type: 'auth/SET_USER', payload: response.data.user })

          setAuthorization(response.data.jwt);

          resolve()
        } else {
          reject(new Error('Yetkiniz olmayan bir alana girmeye çalışıyorsun'))
        }
      }).catch((error) => {
        let message = 'Beklenmeyen bir hata oluştu';

        if (error?.response?.data?.[0]?.messages?.[0]?.message) {
          message = error.data[0].messages[0].message
        }

        reject(message)
      });
    })
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: 'auth/SET_USER', payload: null });

    removeAuthorization();
  };
};

export const reducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
    case 'auth/SET_USER': return { ...state, user: payload };

    default:
      return state;
  }
};

import axios from 'axios';

const {
  REACT_APP_API_URL,
  REACT_APP_LOCALSTORAGE_KEY_JWT,
} = process.env;

// set api instance
const ax = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const setAuthorization = (jwt) => {
  if (jwt) {
    window.localStorage.setItem(REACT_APP_LOCALSTORAGE_KEY_JWT, jwt);

    ax.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  }
};

export const removeAuthorization = () => {
  window.localStorage.removeItem(REACT_APP_LOCALSTORAGE_KEY_JWT);

  delete ax.defaults.headers.common.Authorization;
};

export default ax;

// authUtils.js

import { jwtDecode } from "jwt-decode";

export const storeTokenInLocalStorage = (token) => {
  localStorage.setItem('userToken', token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('userToken');
};

export const getTokenDecode = () => {
  const decodedToken = jwtDecode(localStorage.getItem('userToken'));
  return decodedToken;
};

export const clearTokenFromLocalStorage = () => {
  localStorage.removeItem('userToken');
};

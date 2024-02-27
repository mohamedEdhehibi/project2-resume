import axios from 'axios';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER,LOADING_USER } from './constant';
import { userService } from '../Config';

export function RegisterUser(data) {
  console.log('type', data);
  const request = axios
    .post(`${userService}user/register`, data)
    .then((res) => res.data);
  return { type: REGISTER_USER, payload: request };
}

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post(`${userService}user/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export function auth(payload) {
  
  return {
    type: AUTH_USER,
    payload
  };
}

export function logoutUser() {
  
  return {
    type: LOGOUT_USER,
    payload: {user: null,
      token:null,
      loading:false}
  };
}
export function loading() {
  
  return {
    type: LOADING_USER,
    payload: {
      loading:true}
  };
}

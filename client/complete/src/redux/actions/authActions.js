import axios from 'axios';
import { browserHistory } from 'react-router';
import { settings } from '../../settings';

function handleError(error) {
  if (error.response) {
    console.log(error.response.data.error);
  } else {
    console.log(error);
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user
  };
}

export function signup(data) {
  return dispatch => {
    axios.post(`${settings.host}/auth/signup`, data).then(response => {
      const token = response.data.token;
      const user = response.data.user;
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      dispatch(setCurrentUser(user));
      user.admin === true ? browserHistory.push(`/dashboard`) : browserHistory.push(`/`);
      console.log('注册成功了！')
    }).catch(error => {
      handleError(error);
    });
  }
}

export function login(data) {
  return dispatch => {
    axios.post(`${settings.host}/auth/login`, data).then(response => {
      const token = response.data.token;
      const user = response.data.user;
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      dispatch(setCurrentUser(user));
      user.admin === true ? browserHistory.push(`/dashboard`) : browserHistory.push(`/`);
      console.log('登录成功了！')
    }).catch(error => {
      handleError(error);
    });
  }
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('currentUser');
    dispatch(setCurrentUser({}));
    browserHistory.push(`/`);
  }
}

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

export function newPost(data) {
  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('content', data.content);
  formData.append('post', data.file);
  return function(dispatch) {
    axios.post(`${settings.host}/posts`, formData, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'ADD_POST', post: response.data.post })
      browserHistory.push('/dashboard');
      console.log(response.data.message)
    }).catch(error => {
      handleError(error);
    });
  }
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${settings.host}/posts`).then(response => {
      dispatch({ type: 'LOAD_POSTS', posts: response.data.posts });
    }).catch(error => {
      handleError(error);
    });
  }
}

export function editPost(data, id) {
  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('content', data.content);
  formData.append('post', data.file);
  return function(dispatch) {
    axios.put(`${settings.host}/posts/${id}`, formData, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'EDIT_POST', post: response.data.post })
      browserHistory.push('/dashboard');
      console.log(response.data.message)
    }).catch(error => {
      handleError(error);
    });
  }
}

export function getPost(id) {
  return (dispatch) => {
    axios.get(`${settings.host}/posts/${id}`).then(response => {
      dispatch({ type: 'LOAD_POST', post: response.data.post });
    }).catch(error => {
      handleError(error);
    });
  }
}

export function clearPost() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_POST' });
  }
}

export function deletePost(id) {
  return function(dispatch) {
    axios.delete(`${settings.host}/posts/${id}`, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'DELETE_POST', id: response.data.id })
      console.log(response.data.message)
    }).catch(error => {
      handleError(error);
    });
  }
}

import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';

export default (state = [], action = {}) => {
  switch(action.type) {
    case 'LOAD_POSTS':
      return action.posts
    case 'ADD_POST':
      return [...state, action.post]
    case 'EDIT_POST':
      return map((post, index) => {
        if(post._id === action.post._id) {
          return action.post
        } else {
          return post
        }
      }, state)
    case 'DELETE_POST':
      return filter((post) => {
        return post._id !== action.id
      }, state)
    default:
      return state
  }
}

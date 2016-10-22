export default (state = {}, action = {}) => {
  switch(action.type) {
    case 'LOAD_POST':
      return action.post
    case 'CLEAR_POST':
      return {}
    default:
      return state
  }
}

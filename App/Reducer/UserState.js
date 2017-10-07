
const UserState = (state = {}, action) => {

  switch (action.type) {
    case 'SET_LOG_IN_STATUS':
      return Object.assign({}, state, { loggedId: action.value });
    case 'SET_ACCESS_TOKEN':
      return Object.assign({}, state, { accessToken: action.value });
    default:
      return state;
  }
};

export default UserState;

import Immutable from 'immutable';

export const UserRecord = Immutable.Record({
  loggedIn: false,
  accessToken: undefined
});

const UserState = (state, action) => {

  if (!state) {
    state = new UserRecord();
  }

  switch (action.type) {
    case 'SET_LOG_IN_STATUS':
      return state.set('loggedIn', action.value);
    case 'SET_ACCESS_TOKEN':
      return state.set('accessToken', action.value);
    case 'CLEAR_USER':
      return new UserRecord();
    default:
      return state;
  }
};

export default UserState;

const { List } = require('immutable');

const UserPosition = (state, action) => {

  if (!state) {
    state = {
      currentPosition: { latitude: 47.051389, longitude: 21.940278 },
      watchPosition: false,
      route: List(),
      movementData: List(),
      time: 0,
    };
  }

  switch (action.type) {
    case 'SET_WATCH_POSITION':
      return Object.assign({}, state, {
        watchPosition: action.value, route: (action.value ? state.route.push(List()): state.route)
      });
    case 'SET_POSITION':
      return Object.assign({}, state, {
        currentPosition: action.value
      });
    case 'ADD_POSITION':
      return Object.assign({}, state, {
        route: state.route.butLast().push(state.route.last().push(action.value))
      });
    case 'ADD_MOVEMENT_DATA':
      return Object.assign({}, state, {
        movementData: state.movementData.push(action.value)
      });
    case 'INCREMENT_TIME':
      return Object.assign({}, state, {
        time: state.time + action.value
      });
    default:
      return state;
  }
}

export default UserPosition;

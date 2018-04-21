
const Route = (state, action) => {

  if (!state) {
    state = {
      time: 0,
      workoutState: 'stopped',
      hasLocation: false,
      route: [],
      movementData: [],
      weather: {},
      activity: '',
    }
  }

  switch (action.type) {
    case 'ADD_ROUTE_SEGMENT':
      return Object.assign({}, state, { route : [...state.route, []]});
    
    case 'ADD_POSITION':
      return Object.assign({}, state, { hasLocation: true, route: state.route.map((seg, index) => {
        if (index === state.route.length - 1) {
          return [...seg, Object.assign({}, action.value, { time: state.time })];
        }

        return seg;
      })});
    
    case 'INCREMENT_TIME':
      return Object.assign({}, state, { time: state.time + 1 });
    
    case 'SET_TIME':
      return Object.assign({}, state, { time: state.time + action.value });
    
    case 'SET_WORKOUT_STATE':
      let hasLocation = state.hasLocation;
      if (action.value !== 'started') {
        hasLocation = false;
      }

      return Object.assign({}, state, { workoutState: action.value, hasLocation: hasLocation });
    
    case 'ADD_MOVEMENT_DATA':
      return Object.assign({}, state, { movementData: [...state.movementData, action.value] });
    
    case 'SET_WEATHER':
      return Object.assign({}, state, { weather: action.value });
    
    case 'SET_ACTIVITY':
      return Object.assign({}, state, { activity: action.value, route: state.route.map(seg =>
          seg.map(p => {
            if (!p.activity) {
              p.activity = action.value;
            }

            return p;
          })
        ) 
      });
    
    default:
      return state;
  }
};

export default Route;

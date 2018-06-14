import Immutable from 'immutable';

const RouteRecord = Immutable.Record({
  time: 0,
  workoutState: 'stopped',
  hasLocation: false,
  route: Immutable.List(),
  movementData: Immutable.List(),
  weather: {temperature: 0},
  activity: '',
  name: 'New Workout',
  track: false,
  followWorkout: []
});

const Route = (state, action) => {

  if (!state) {
    state = new RouteRecord();
  }

  switch (action.type) {
    case 'SET_NAME':
      return state.set('name', action.value);

    case 'ADD_ROUTE_SEGMENT':
      return state.set('route', state.get('route').push(Immutable.List()));
    
    case 'ADD_POSITION':
      let route = state.get('route');
      action.value.time = state.get('time');

      return state
        .set('hasLocation', true)
        .set('route', route.butLast().push(route.last().push(action.value)));
    
    case 'INCREMENT_TIME':
      return state.set('time', state.get('time') + 1);
    
    case 'SET_TIME':
      return state.set('time', state.get('time') + action.value);
    
    case 'SET_WORKOUT_STATE':
      let hasLocation = action.value !== 'started' ? false : state.get('hasLocation');

      return state
        .set('workoutState', action.value)
        .set('hasLocation', hasLocation);
    
    case 'ADD_MOVEMENT_DATA':
      let movementData = state.get('movementData');

      return state.set('movementData', state.get('movementData').push(action.value));
    
    case 'SET_WEATHER':
      return state.set('weather', action.value);
    
    case 'SET_ACTIVITY':
      let updatedRoute = state
        .get('route')
        .map(seg => seg.map(loc => {
          if (!loc.activity) {
            loc.activity = action.value;
          }

          return loc;
        }));

      return state
        .set('activity', action.value)
        .set('route', updatedRoute);
    
    case 'RESET_WORKOUT':
        return new RouteRecord();

    case 'FOLLOW_WORKOUT':
        return state.set('followWorkout', action.value);

    case 'TOGGLE_POSITION_TRACK':
        return state.set('track', !state.get('track'));
        
    default:
      return state;
  }
};

export default Route;

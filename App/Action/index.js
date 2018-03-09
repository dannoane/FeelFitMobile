
export const setLogInStatus = (status) => ({
  type: 'SET_LOG_IN_STATUS',
  value: status
});

export const setAccessToken = (accessToken) => ({
  type: 'SET_ACCESS_TOKEN',
  value: accessToken
});

export const addRouteSegment = () => ({
  type: 'ADD_ROUTE_SEGMENT'
});

export const addPosition = (position) => ({
  type: 'ADD_POSITION',
  value: position
});

export const incrementTime = () => ({
  type: 'INCREMENT_TIME',
});

export const setTime = (time) => ({
  type: 'SET_TIME',
  value: time
});

export const setWorkoutState = (workoutState) => ({
  type: 'SET_WORKOUT_STATE',
  value: workoutState
});

export const addMovementData = (movementData) => ({
  type: 'ADD_MOVEMENT_DATA',
  value: movementData
});

export const setWeather = (weather) => ({
  type: 'SET_WEATHER',
  value: weather
});

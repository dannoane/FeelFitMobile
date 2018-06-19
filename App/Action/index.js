
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

export const setActivity = (activity) => ({
  type: 'SET_ACTIVITY',
  value: activity
});

export const resetWorkout = () => ({
  type: 'RESET_WORKOUT'
});

export const setWorkoutName = (name) => ({
  type: 'SET_NAME',
  value: name
});

export const setFollowWorkout = (workout) => ({
  type: 'FOLLOW_WORKOUT',
  value: workout
});

export const togglePositionTrack = () => ({
  type: 'TOGGLE_POSITION_TRACK',
});

export const setSearchUsername = (username) => ({
  type: 'SET_USERNAME',
  value: username
});

export const setSearchLocation = (location) => ({
  type: 'SET_LOCATION',
  value: location
});

export const setRadius = (radius) => ({
  type: 'SET_RADIUS',
  value: radius
});

export const setSearchActivity = (activity) => ({
  type: 'SET_SEARCH_ACTIVITY',
  value: activity
});

export const setUserLocation = () => ({
  type: 'SET_USER_LOCATION'
});

export const setFoundWorkouts = (foundWorkouts) => ({
  type: 'SET_FOUND_WORKOUTS',
  value: foundWorkouts
});

export const clearUser = () => ({
  type: 'CLEAR_USER'
});

export const clearGlobal = () => ({
  type: 'CLEAR_GLOBAL'
});

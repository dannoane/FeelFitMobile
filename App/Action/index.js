
export const setLogInStatus = (status) => ({
  type: 'SET_LOG_IN_STATUS',
  value: status
});

export const setAccessToken = (accessToken) => ({
  type: 'SET_ACCESS_TOKEN',
  value: accessToken
});

export const setCurrentPosition = (position) => ({
  type: 'SET_POSITION',
  value: position
});

export const addPosition = (position) => ({
  type: 'ADD_POSITION',
  value: position
});

export const addMovementData = (data) => ({
  type: 'ADD_MOVEMENT_DATA',
  value: data
});

export const setWatchPosition = (watchPosition) => ({
  type: 'SET_WATCH_POSITION',
  value: watchPosition
})

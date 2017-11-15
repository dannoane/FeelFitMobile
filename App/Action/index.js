
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
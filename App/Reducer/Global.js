import Immutable from 'immutable';

export const GlobalRecord = Immutable.Record({
    username: '',
    location: '',
    radius: 10,
    activity: "1",
    userLocation: false,
    foundWorkouts: []
});

const Global = (state, action) => {

    if (!state) {
        state = new GlobalRecord();
    }

    switch (action.type) {

        case 'SET_USERNAME':
            return state.set('username', action.value);
        case 'SET_LOCATION':
            return state.set('location', action.value);
        case 'SET_RADIUS':
            return state.set('radius', action.value);
        case 'SET_SEARCH_ACTIVITY':
            return state.set('activity', action.value);
        case 'SET_USER_LOCATION':
            return state.set('userLocation', !state.get('userLocation'));
        case 'SET_FOUND_WORKOUTS':
            return state.set('foundWorkouts', action.value);
        case 'CLEAR_GLOBAL':
            return new GlobalRecord();
        default:
            return state;
    }
};

export default Global;

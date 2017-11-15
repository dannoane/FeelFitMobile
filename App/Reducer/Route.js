
const Route = (state = [], action) => {

  switch (action.type) {
    case 'ADD_ROUTE_SEGMENT':
      return [
        ...state,
        []
      ];
    case 'ADD_POSITION':
      return state.map((seg, index) => {
        if (index === state.length - 1) {
          return [...seg, action.value];
        }

        return seg;
      });
    default:
      return state;
  }
};

export default Route;
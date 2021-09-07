export const countReducer = function (state = '', action) {
  switch (action.type) {
    case 'SET_EMAIL':
        state = action.payload;
      return state;
    default:
      return state;
  }
};
const initialState = {
  loading: false,
  data: [],
  error: false,
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRACK":
      return {
        ...state,
        data: action.payload.res,
      };

    default:
      return state;
  }
};

export default tracksReducer;

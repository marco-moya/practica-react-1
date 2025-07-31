const initialState = {
  token: null,
  library: [],
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "ADD_SONG":
      if (!state.library.find((song) => song.id === action.payload.id)) {
        return {
          ...state,
          library: [...state.library, action.payload],
        };
      }
    case "REMOVE_SONG":
      return {
        ...state,
        library: state.library.filter((song) => song.id !== action.payload),
      };
    default:
      return state
  }
}

export default libraryReducer;
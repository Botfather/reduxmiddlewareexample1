const initialState = {
  response: null,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'REQUEST_USER_LIST': {
      const { errorMessage, response } = payload;
      return { ...state, response, error: errorMessage };
    }

    default:
      return state;
  }
};

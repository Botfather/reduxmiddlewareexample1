export default ({ dispatch, getState }) => next => (action) => {
  // the dispatched action has an async task associated to it..
  if (action.asyncTask) {
    // since the task exist, lets handle it here and call next accordingly
    action.asyncTask.then((response) => {
      // since we have the response from web service, we create and attach it to a payload and pass it ahead
      response.json().then((parsedResponse) => {
        next({ ...action, payload: { response: JSON.stringify(parsedResponse, null, 2) } });
      }).catch((() => {
        next({ ...action, payload: { response: undefined, errorMessage: 'Error parsing data' } });
      }));
    }).catch(() => {
      // we add an errorMessage to our object in payload for reducers to show it on screen
      next({ ...action, payload: { response: undefined, errorMessage: 'Something went wrong!' } });
    });
  } else {
    // we don't need to do anything as there was no async task
    // associated so let us forward the action to the next middleware or
    // dispatch to store (finally)
    next(action);
  }
};

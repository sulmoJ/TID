function createStore(reducer) {
  let state;
  const listeners = [];
  const getState = () => ({ ...state });
  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };
  return {
    getState,
    dispatch,
    subscribe,
  };
}

exports.createStore = createStore;

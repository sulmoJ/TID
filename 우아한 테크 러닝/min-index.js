const { createStore, actionCreator } = require("./min-redux.js");

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case "init":
      return {
        ...state,
        count: payload.count,
      };
    case "inc":
      return {
        ...state,
        count: state.count + 1,
      };
    case "reset":
      return {
        ...state,
        count: 0,
      };
    default:
      return { ...state };
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "init",
  payload: {
    count: 1,
  },
});

store.dispatch({
  type: "inc",
});

// store.dispatch(actionCreator("reset"));

// const Increment = () => store.dispatch(actionCreator("inc"));

// Increment();
// Increment();
// Increment();

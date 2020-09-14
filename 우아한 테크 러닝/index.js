const { createStore } = require("./redux");

function reducer(state = {}, action) {
  if (action.type === "abc") {
    return {
      ...state,
      abc: "abb",
    };
  } else if (action.type === "inc") {
    return {
      ...state,
      count: state.count + 1,
    };
  } else if (action.type === "init") {
    return {
      ...state,
      count: action.payload.count,
    };
  } else {
    return {
      ...state,
    };
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

console.log(store.getState());
store.dispatch({ type: "abc" });

store.dispatch({
  type: "init",
  payload: {
    count: 1,
  },
});

store.dispatch({
  type: "inc",
});

// store.person = {}; 이렇게하면 이뮤터블하지 못함

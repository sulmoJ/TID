# 안녕하세욤

아주 작은 리덕스 만들어보기 입니다.

index.js

```javascript
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
```

redux.js

```javascript
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

```
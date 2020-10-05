import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import tasksRecuder from "./reducers/tasksReducer";

function configureStore(state) {
  return createStore(
    tasksRecuder,
    applyMiddleware(promiseMiddleware),
    state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

// composeStoreWithMiddleware = applyMiddleware(
//   promise,
// )(createStore)

// applyMiddleware(promise)(
//   createStore(
//     tasksRecuder,
//     state,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default configureStore;

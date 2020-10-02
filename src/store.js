import { createStore } from "redux";
import tasksRecuder from "./reducers/tasksReducer";

function configureStore(state) {
  return createStore(
    tasksRecuder,
    state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default configureStore;
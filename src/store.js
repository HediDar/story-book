import { createStore } from "redux";
import tasksRecuder from "./reducers/tasksReducer";

function configureStore(state = { tasks: [] }) {
  return createStore(tasksRecuder, state);
}

export default configureStore;

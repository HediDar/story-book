import {
  DISPLAY_MODE,
  ADD_TASK,
  FETCH_DATA,
  DELETE_DATA,
  UPDATE_TASK,
  LOADER_BOOL,
} from "./actions-types";
import { getAllTasks, deleteTask, updateTask, addTask } from "../domain/myAPIS";

const fetchAllTasksByApiAction = () => {
  return {
    type: FETCH_DATA,
    payload: getAllTasks(),
  };
};

const addTaskByApiAction = (task) => {
  return {
    type: ADD_TASK,
    payload: addTask(task),
  };
};

function deleteTaskByApiAction({ id }) {
  return {
    type: DELETE_DATA,
    payload: deleteTask({ id }),
  };
}

function updateTaskByApiAction(task) {
  // console.log(isImportantTest);
  return {
    type: UPDATE_TASK,
    payload: updateTask(task),
    meta: task.importantOrDoneBool,
  };
}

function changeDisplayModeAction(mode) {
  return {
    type: DISPLAY_MODE,
    payload: mode,
  };
}

function addTaskAction(task) {
  return {
    type: ADD_TASK,
    payload: { ...task },
  };
}

function setLoaderBoolToActiveAction() {
  return {
    type: LOADER_BOOL,
  };
}

export {
  setLoaderBoolToActiveAction,
  addTaskByApiAction,
  updateTaskByApiAction,
  deleteTaskByApiAction,
  fetchAllTasksByApiAction,
  changeDisplayModeAction,
  addTaskAction,
};

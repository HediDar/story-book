import {
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
  INITIALISE_ALL_TASKS,
  FETCH_DATA,
  DELETE_DATA,
  UPDATE_IMPORTANT,
  UPDATE_DONE,
} from "./actions-types";
import { getAllTasks, deleteTask, updateTask } from "../domain/myAPIS";

const fetchAllTasksByApiAction = () => {
  return {
    type: FETCH_DATA,
    payload: getAllTasks(),
  };
};

function deleteTaskByApiAction({ id }) {
  return {
    type: DELETE_DATA,
    payload: deleteTask({ id }),
  };
}

function updateTaskImportantByApiAction(task) {
  return {
    type: UPDATE_IMPORTANT,
    payload: updateTask(task),
  };
}

function updateTaskDoneByApiAction(task) {
  return {
    type: UPDATE_DONE,
    payload: updateTask(task),
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

export {
  updateTaskDoneByApiAction,
  updateTaskImportantByApiAction,
  deleteTaskByApiAction,
  fetchAllTasksByApiAction,
  changeDisplayModeAction,
  addTaskAction,
};

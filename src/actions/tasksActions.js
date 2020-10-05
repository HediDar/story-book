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

function initialiseAllTasksAction(tasks) {
  return {
    type: INITIALISE_ALL_TASKS,
    payload: tasks,
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

function removeTaskAction({ id }) {
  return {
    type: REMOVE_TASK,
    payload: { id },
  };
}

function makeImportantAction({ id }) {
  return {
    type: MAKE_IMPORTANT,
    payload: { id },
  };
}

function addToDoneAction({ id }) {
  return {
    type: ADD_TO_DONE,
    payload: { id },
  };
}

export {
  updateTaskImportantByApiAction,
  deleteTaskByApiAction,
  fetchAllTasksByApiAction,
  initialiseAllTasksAction,
  addToDoneAction,
  makeImportantAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};

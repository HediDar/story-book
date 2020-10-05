import {
  DISPLAY_MODE,
  REMOVE_TASK,
  ADD_TASK,
  ADD_TO_DONE,
  MAKE_IMPORTANT,
  INITIALISE_ALL_TASKS,
  FETCH_DATA,
} from "./actions-types";
import { getAllTasks, deleteTask, updateTask } from "../domain/myAPIS";



const fetchAllTasksByApiAction = () => {
  return {
    type: FETCH_DATA,
    payload: getAllTasks(),
  };
};


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
  fetchAllTasksByApiAction,
  initialiseAllTasksAction,
  addToDoneAction,
  makeImportantAction,
  changeDisplayModeAction,
  addTaskAction,
  removeTaskAction,
};
